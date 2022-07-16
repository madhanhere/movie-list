import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { AuthService } from '../api/auth.service';
import { GlobalHelpers } from '../helpers/GlobalHelpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginErrorMessage: string = '';

  loginForm: FormGroup<any> = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(GlobalHelpers.EMAIL_REGEXP)
      ],
    },),
    password: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    if (email !== "madhan@mail.com" || password !== "admin") {
      this.loginErrorMessage = "Email or Password Incorrect";
      return;
    }

    this.authService.login(email);
  }
}
