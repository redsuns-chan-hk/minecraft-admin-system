import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public goToAbout(): void {
    this.router.navigateByUrl('/about');
  }

  public goToHome(): void {
    this.router.navigateByUrl('/');
  }

  public onClickMenu(): void {

  }

}
