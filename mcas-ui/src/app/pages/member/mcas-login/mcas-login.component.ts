import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mcas-login',
  templateUrl: './mcas-login.component.html',
  styleUrls: ['./mcas-login.component.css'],
  providers: [ HttpClient ]
})
export class McasLoginComponent implements OnInit {

  public loginNameControl: FormControl;
  public passwordControl: FormControl;
  public loginFormGroup: FormGroup;


  constructor(
    public http: HttpClient
  ) {
    this.loginNameControl = new FormControl();
    this.passwordControl = new FormControl();
    this.loginFormGroup = new FormGroup({
      loginName: this.loginNameControl,
      password: this.passwordControl
    });
  }

  ngOnInit(): void {
  }

}
