import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mcas/service/auth.service';
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

  constructor(
    public splashService: SplashService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private memberService: MemberService,
  ) {
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
      if (window.localStorage.getItem('refresh_token') != null) {
        this.verifyStoredToken();

        let expires_time = window.localStorage.getItem('expires_time');
        if (expires_time != null && parseInt(expires_time) <= new Date().getTime()) {
          // Need to refresh the token.
          this.auth.retrieveDiscordToken().then(response => {
            this.createTokenStorage(response);
            this.getDiscordInfoByToken(window.localStorage.getItem('access_token'));
          });
        } else {
          this.getDiscordInfoByToken(window.localStorage.getItem('access_token'));
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
              this.getDiscordInfoByToken(window.localStorage.getItem('access_token'));
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
    let access_token = window.localStorage.getItem('access_token');
    if (access_token != null && access_token == 'undefined') {
      this.cleanTokenStorage();
    } else {
      let expires_time = window.localStorage.getItem('expires_time');
      if (expires_time != null && expires_time == 'NaN') {
        this.cleanTokenStorage();
      } else {
        if (expires_time != null && parseInt(expires_time) <= new Date().getTime()) {
          this.cleanTokenStorage();
        } else {
          if (expires_time == null) {
            this.cleanTokenStorage();
          }
        }
      }
    }
  }

  private createTokenStorage(response: any) {
    window.localStorage.setItem('access_token', response.access_token);
    window.localStorage.setItem('refresh_token', response.refresh_token);
    window.localStorage.setItem('expires_in', response.expires_in);
    window.localStorage.setItem(
      'expires_time',
      new Date().getTime() + response.expires_in
    );
  }

  private cleanTokenStorage() {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('expires_in');
    window.localStorage.removeItem('expires_time');
  }

  private getDiscordInfoByToken(token: string | null): void {
    if (token == undefined || token == null) {
      console.error('GetDiscordInfoByToken(): TOKEN == NULL');

      this.splashService.disable();
      this.redirectToDiscordAuthPage();
    } else {

      this.splashService.enable();
      this.auth.getDiscordInfoByToken(token).subscribe(infoResult => {

        this.splashService.disable();
        if (infoResult != undefined) {
          let userId = infoResult.id;
          let userName = infoResult.username;

          this.registerFormDiscordId.setValue(userId);
          this.registerFormDiscordName.setValue(userName);

          console.log(`Register as ${userName} (${userId})`);
        } else {
          console.error("Unable to get authorized user info.")
        }
      });
    }
  }

  private redirectToDiscordAuthPage() {

    this.splashService.disable();
    window.location.href = environment.discord.authorizePage;
  }
}
