import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscordTokenService {

  constructor(
    private auth: AuthService
  ) { }

  public update(accessToken: string, refreshToken: string, expiresIn: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }

  public clean() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('expires_time');
  }

  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('access_token') == null ? '' : localStorage.getItem('access_token') + '';
  }

  set refreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refresh_token') == null ? '' : localStorage.getItem('refresh_token') + '';
  }

  set expiresIn(expiresIn: string) {
    localStorage.setItem('expires_in', expiresIn);
    localStorage.setItem(
      'expires_time',
      new Date().getTime() + expiresIn
    );
  }

  get expiresIn(): string {
    return localStorage.getItem('expires_in') == null ? '' : localStorage.getItem('expires_in') + '';
  }

  get expiresTime(): Date {
    return new Date(parseInt(localStorage.getItem('expires_time') + ''));
  }

  public goAuthPage() {
    location.href = environment.discord.authorizePage;
  }

}
