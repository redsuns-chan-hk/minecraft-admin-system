import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public register(formValue: any): Observable<any> {
    return this.http.post(
      environment.apiEndpoint + '/member/register',
      formValue
    );
  }

  public isUserApplied(discordId: string, discordName: string): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/discord/user/is/applied', {
      discordId,
      discordName,
    });
  }

  public isAdmin(discordId: string): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/discord/user/is/admin', {
      discordId
    });
  }
}
