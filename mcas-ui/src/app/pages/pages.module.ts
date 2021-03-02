
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McasLoginComponent } from '@mcas/pages/member/mcas-login/mcas-login.component';
import { SharedModule } from '@mcas/shared.module';
import { HomeComponent } from './pekomikoland/home/home.component';
import { MemberApplicationComponent } from './member/member-application/member-application.component';
import { AboutComponent } from './pekomikoland/about/about.component';
import { PrivacyComponent } from './pekomikoland/privacy/privacy.component';
import { NewsComponent } from './pekomikoland/news/news.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    McasLoginComponent,
    HomeComponent,
    MemberApplicationComponent,
    AboutComponent,
    PrivacyComponent,
    NewsComponent
  ]
})
export class PagesModule { }
