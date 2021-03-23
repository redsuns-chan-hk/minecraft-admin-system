import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '@mcas/service/auth.service';
import { DiscordTokenService } from '@mcas/service/discord-token.service';

@Component({
  selector: 'app-mcas-login',
  templateUrl: './mcas-login.component.html',
  styleUrls: ['./mcas-login.component.scss'],
  providers: [ HttpClient ]
})
export class McasLoginComponent implements OnInit {

  public loginNameControl: FormControl;
  public passwordControl: FormControl;
  public loginFormGroup: FormGroup;


  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private discordToken: DiscordTokenService
  ) {
    this.loginNameControl = new FormControl();
    this.passwordControl = new FormControl();
    this.loginFormGroup = new FormGroup({
      loginName: this.loginNameControl,
      password: this.passwordControl
    });
  }

  ngOnInit(): void {
    this.auth.getDiscordInfoByToken(this.discordToken.accessToken).toPromise().then(res => {
      console.log(res);
    }).catch(reason => {
      console.error(reason);
    })
  }

}
