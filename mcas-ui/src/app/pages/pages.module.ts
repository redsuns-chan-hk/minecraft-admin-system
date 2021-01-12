import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McasLoginComponent } from '@mcas/pages/mcas-login/mcas-login.component';
import { SharedModule } from '@mcas/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    McasLoginComponent
  ]
})
export class PagesModule { }
