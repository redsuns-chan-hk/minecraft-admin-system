
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McasLoginComponent } from '@mcas/pages/mcas-login/mcas-login.component';
import { SharedModule } from '@mcas/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    McasLoginComponent,
    HomeComponent
  ]
})
export class PagesModule { }
