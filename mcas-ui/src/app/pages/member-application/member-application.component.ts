import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mcas/service/auth.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './member-application.component.html',
  styleUrls: ['./member-application.component.scss']
})
export class MemberApplicationComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription = new Subscription();

  public code: string = ''

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      let paramCode = params['code'];
      if (params == undefined || params == null) {
        console.error('No Parameters Received.');
        this.redirectToDiscordAuthPage();
      }
      if (paramCode == undefined || paramCode == null) {
        console.error('No Discord OAuth Token Found.');
        this.redirectToDiscordAuthPage();
      } else {
        this.code = paramCode;

        this.auth.retrieveDiscordToken(this.code).then(res => {
          console.log(res)
        });

        /**
        this.auth.getOAuth2ClientInfo().toPromise().catch(reason => {
          console.error(reason);
          this.redirectToDiscordAuthPage();
        }).then((secret: string) => {
          let redirectTo = window.location.protocol + '//' + window.location.host + window.location.pathname;

          this.auth.getDiscordTokenByCode(secret, this.code, redirectTo).toPromise().catch(reason => {
            console.error(reason);
            this.redirectToDiscordAuthPage();
          }).then(tokenResult => {
            console.log(tokenResult)
            let token = tokenResult.access_token;
            this.auth.getDiscordInfoByToken(token).toPromise().catch(reason => {
              console.error(reason.error.message);
              this.redirectToDiscordAuthPage();
            }).then(infoResult => {
              if (infoResult != undefined) {
                console.log(infoResult);
              } else {
                console.error("Unable to get authorized user info.")
              }
            });
          })
        }) */
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onClickConnectionDiscord() {

  }

  private redirectToDiscordAuthPage() {
    window.location.href = environment.discord.authorizePage;
  }

}
