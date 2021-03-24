import { Injectable } from '@angular/core';
import {
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '@mcas/service/auth.service';
import { DiscordTokenService } from '@mcas/service/discord-token.service';
import { MemberService } from '@mcas/service/member.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private discordToken: DiscordTokenService,
    private memberService: MemberService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    console.log('Can Load?');
    return this.isAllowed();
  }

  async isAllowed(): Promise<boolean> {
    let allowed: boolean = false;
    if (
      this.discordToken.accessToken == undefined ||
      this.discordToken.accessToken == null ||
      this.discordToken.accessToken.trim().length == 0
    ) {
      console.error('AdminAuthGuard: Discord Access Token Not Found');
      this.router.navigateByUrl('/apply');
      return allowed;
    } else {
      console.log('AdminAuthGuard: Token Found, Getting Is Admin...');
      let userData = await this.auth
        .getDiscordInfoByToken(this.discordToken.accessToken)
        .toPromise();
      let isAdminData = await this.memberService
        .isAdmin(userData.id)
        .toPromise();
      console.log('AdminAUthGuard: User Is Admin = ' + isAdminData.data);
      allowed = isAdminData.data;
      if (!allowed)
      {
        this.router.navigateByUrl('/apply');
      }
    }
    return allowed;
  }
}
