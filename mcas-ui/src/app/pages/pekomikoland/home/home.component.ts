import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashService } from '@mcas/service/splash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private splashService: SplashService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onClickApply(): void {
    this.router.navigateByUrl('/apply');
  }

}
