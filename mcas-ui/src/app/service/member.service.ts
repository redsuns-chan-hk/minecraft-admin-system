import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  public register(formValue: any): Observable<any> {
    return this.http.post(
      environment.apiEndpoint + '/member/register',
      formValue
    );
  }

  public checkAppliedBefore(userId: string, userName: string): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/member/verify/applied', {
      userId,
      userName,
    });
  }
}
