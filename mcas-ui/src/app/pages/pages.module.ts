
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@mcas/shared.module';
import { HomeComponent } from './pekomikoland/home/home.component';
import { MemberApplicationComponent } from './member/member-application/member-application.component';
import { AboutComponent } from './pekomikoland/about/about.component';
import { PrivacyComponent } from './pekomikoland/privacy/privacy.component';
import { NewsComponent } from './pekomikoland/news/news.component';
import { ApplySuccessComponent } from './member/member-application/apply-success/apply-success.component';
import { ApplyDuplicatedComponent } from './member/member-application/apply-duplicated/apply-duplicated.component';
import { MainPanelComponent } from './admin/main-panel/main-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    MemberApplicationComponent,
    AboutComponent,
    PrivacyComponent,
    NewsComponent,
    ApplySuccessComponent,
    ApplyDuplicatedComponent,
    MainPanelComponent
  ]
})
export class PagesModule { }
