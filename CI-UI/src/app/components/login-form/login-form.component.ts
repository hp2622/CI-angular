import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'visibility_off';
  loginForm!: FormGroup;
  isPasswordBlur: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: LoginServiceService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.checkTokenExist();
    this.createForm();
  }

  //function for checking if token already exist in local storage or not
  checkTokenExist() {
    let token = this.login.getToken();

    if (token != null) {
      this.router.navigate(['/landingPage']);
    }
  }

  //function for create a form while initializing login page
  createForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          ),
        ],
      ],
    });
  }

  // method calls when user press login button
  onLogin() {
    if (this.loginForm.valid) {
      // call api
      this.login.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.login.storeToken(res.data);
          this.router.navigate(['/landingPage']);
          this.notifyService.showSuccess('', 'Login Done Successfully 🤩!!');
        },
        error: (err) => {
          this.notifyService.showError('', 'Email or password is incorrect!!');
        },
      });
    } else {
      console.log(this.loginForm.value);
    }
  }

  //function for hide show password
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeIcon = 'remove_red_eye')
      : (this.eyeIcon = 'visibility_off');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  // method for check if password field is blurred or not according to this margin is given to confirm password field
  validatePassword() {
    this.isPasswordBlur = true;
  }
}
