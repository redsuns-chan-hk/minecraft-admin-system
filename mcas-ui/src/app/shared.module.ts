import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';


@NgModule({
  imports: [
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    HttpClient
  ],
})
export class SharedModule { }
