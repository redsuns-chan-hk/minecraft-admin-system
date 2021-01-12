import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    HttpClient
  ],
})
export class SharedModule { }
