import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mcas/service/auth.service';
import { DiscordTokenService } from '@mcas/service/discord-token.service';
import { MemberService } from '@mcas/service/member.service';
import { SplashService } from '@mcas/service/splash.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './member-application.component.html',
  styleUrls: ['./member-application.component.scss']
})
export class MemberApplicationComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription = new Subscription();

  public code: string = '';

  public registerFormDiscordId: FormControl;
  public registerFormDiscordName: FormControl;
  public registerFormMinecraftName: FormControl;
  public registerFormEnterReason: FormControl;
  public registerFormFavouriteVtubers: FormControl;
  public registerFormSource: FormControl;
  public registerFormReferer: FormControl;

  public registerFormGroup: FormGroup;

  public registerSuccess: boolean;
  public registerUserDuplicated: boolean;

  constructor(
    public splashService: SplashService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private discordToken: DiscordTokenService,
    private snackbar: MatSnackBar,
    private router: Router,
    private memberService: MemberService,
  ) {
    this.registerSuccess = false;
    this.registerUserDuplicated = false;

    this.registerFormDiscordId = new FormControl('', [ Validators.required ]);
    this.registerFormDiscordName = new FormControl('', [ Validators.required ]);
    this.registerFormMinecraftName = new FormControl('', [ Validators.required ]);
    this.registerFormEnterReason = new FormControl('', [ Validators.required ]);
    this.registerFormFavouriteVtubers = new FormControl('', [ Validators.required ]);
    this.registerFormSource = new FormControl('', [ Validators.required ]);
    this.registerFormReferer = new FormControl('');

    this.registerFormGroup = new FormGroup({
      discordId: this.registerFormDiscordId,
      discordName: this.registerFormDiscordName,
      minecraftName: this.registerFormMinecraftName,
      enterReason: this.registerFormEnterReason,
      favouriteVtubers: this.registerFormFavouriteVtubers,
      source: this.registerFormSource,
      referer: this.registerFormReferer
    });
  }

  ngOnInit(): void {
    console.log("MemberApplicationComponent::ngOnInit()");
    this.splashService.enable();
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      let paramCode = params['code'];
      if (this.discordToken.refreshToken.length > 0) {
        this.verifyStoredToken();

        let expires_time = this.discordToken.expiresTime.getTime().toString();
        if (expires_time.length > 0 && parseInt(expires_time) <= new Date().getTime()) {
          // Need to refresh the token.
          this.auth.retrieveDiscordToken().then(response => {
            this.createTokenStorage(response);
            this.getDiscordInfoByToken(this.discordToken.accessToken);
          });
        } else {
          this.getDiscordInfoByToken(this.discordToken.accessToken);
        }
      } else {
        if (params == undefined || params == null) {
          console.error('No Parameters Received.');
          this.redirectToDiscordAuthPage();
        }
        if (paramCode == undefined || paramCode == null) {
          console.error('No Discord OAuth Token Found.');
          this.redirectToDiscordAuthPage();
        } else {
          this.code = paramCode;


          this.splashService.enable();
          this.auth.retrieveDiscordToken(this.code).then((res) => {
            if (res.error_description == 'Invalid "code" in request.') {
              this.redirectToDiscordAuthPage();
            } else {
              this.createTokenStorage(res);
              this.getDiscordInfoByToken(this.discordToken.accessToken);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.splashService.disable();
    this.paramsSubscription.unsubscribe();
  }

  public onClickRegister(): void {
    this.splashService.enable();
    if (this.registerFormGroup.valid) {
      this.memberService.register(this.registerFormGroup.value).toPromise().then((res) => {
        console.log(res);
        if (res.detail == "RECORD_SAVE_SUCCESS") {
          this.registerSuccess = true;
        } else if (res.detail == "RECORD_DUPLICATED") {
          this.registerUserDuplicated = true;
        }
      }, (reason) => {
        console.error(reason);
      }).finally(() => {
        this.splashService.disable();
      })
    } else {
      console.error('Register Form Invalid.');
    }
    this.splashService.disable();
  }

  private verifyStoredToken(): void {
    let access_token = this.discordToken.accessToken;
    if (access_token != null && access_token == 'undefined' && access_token.trim().length > 0) {
      this.cleanTokenStorage();
    } else {
      let expires_time = this.discordToken.expiresTime.getTime().toString();
      if (expires_time != null && expires_time == 'NaN' && expires_time.trim().length > 0) {
        this.cleanTokenStorage();
      } else {
        if (expires_time.trim().length > 0 && parseInt(expires_time) <= new Date().getTime()) {
          this.cleanTokenStorage();
        } else {
          if (expires_time.trim().length == 0) {
            this.cleanTokenStorage();
          }
        }
      }
    }
  }

  private createTokenStorage(response: any) {
    let accessToken = response.access_token;
    let refreshToken = response.refresh_token;
    let expiresIn = response.expires_in;
    this.discordToken.update(accessToken, refreshToken, expiresIn);
  }

  private cleanTokenStorage() {
    this.discordToken.clean();
    this.router.navigateByUrl('/apply');
  }

  private getDiscordInfoByToken(token: string): void {
    if (token == undefined || token == null || token.trim().length == 0) {
      console.error('GetDiscordInfoByToken(): TOKEN == NULL');

      this.splashService.disable();
      this.redirectToDiscordAuthPage();
    } else {

      this.splashService.enable();
      this.auth.getDiscordInfoByToken(token).subscribe(infoResult => {
        if (infoResult != undefined) {
          let userId = infoResult.id;
          let userName = infoResult.username;

          this.registerFormDiscordId.setValue(userId);
          this.registerFormDiscordName.setValue(userName);

          console.log(`Register as ${userName} (${userId})`);

          this.memberService.checkAppliedBefore(userId, userName).toPromise().then(result => {
            if (result.data == true) {
              console.error("User Applied Already");
              this.registerUserDuplicated = true;
            } else {
              console.warn("User Is Not Applied");
              this.registerUserDuplicated = false;
            }
          }).catch(reason => {
            console.error(reason);
          }).finally(() => {
            this.splashService.disable();
          });
        } else {
          console.error("Unable to get authorized user info.")
        }
      });
    }
  }

  private redirectToDiscordAuthPage() {
    this.discordToken.goAuthPage();
    this.splashService.disable();
  }
}
