import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mcas-login',
  templateUrl: './mcas-login.component.html',
  styleUrls: ['./mcas-login.component.css'],
  providers: [ HttpClient ]
})
export class McasLoginComponent implements OnInit {

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit(): void {
  }

}
