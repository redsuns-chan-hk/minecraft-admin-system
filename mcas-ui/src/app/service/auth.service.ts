import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public retrieveDiscordToken(code: string): Promise<any> {
    let refreshToken = window.localStorage.getItem('discord_refresh_token');
    if (refreshToken != null) {
      return this.http.post(environment.apiEndpoint + '/discord/refresh', {
        token: refreshToken
      }).toPromise();
    } else {
      return this.http.post(environment.apiEndpoint + '/discord/auth', {
        code: code
      }).toPromise();
    }
  }

  getDiscordInfoByToken(token: string): Observable<any> {
    return this.http.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
