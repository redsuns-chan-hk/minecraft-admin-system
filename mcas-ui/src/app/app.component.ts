import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { SplashService } from './service/splash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mcas-ui';
  public splashSubscription: Subscription = new Subscription();

  constructor(
    public splashService: SplashService,
    private cdf: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.splashSubscription = this.splashService.onToggleSplash().subscribe((next) => {
      this.cdf.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.splashSubscription.unsubscribe();
  }
}
