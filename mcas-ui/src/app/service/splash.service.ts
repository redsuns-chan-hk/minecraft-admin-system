import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

/**
 * Global Spinner Service.
 *
 * Remeber DO NOT call enable/disable/toggle in constructor()!!!
 */
@Injectable({
  providedIn: 'root'
})
export class SplashService {

  private enableSubject: Subject<boolean>;
  private enableSubjectObservable: Observable<boolean>;
  private isEnabled: boolean = false;

  constructor(
  ) {
    this.enableSubject = new Subject<boolean>();
    this.enableSubjectObservable = this.enableSubject.asObservable();
  }

  public onToggleSplash(): Observable<boolean> {
    return this.enableSubjectObservable;
  }

  public enable(): void {
    this.isEnabled = true;
    this.enableSubject.next(true);
  }

  public disable(): void {
    this.isEnabled = false
    this.enableSubject.next(false);
  }

  public get enabled() {
    return this.isEnabled;
  }
}
