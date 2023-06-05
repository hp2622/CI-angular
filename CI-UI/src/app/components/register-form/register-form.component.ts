import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  typeOfPassword: string = 'password';
  typeOfConfirmPassword: string = 'password';
  isText: boolean = false;
  isTextForConfirmPassword: boolean = false;
  eyeIcon: string = 'visibility_off';
  eyeIconConfirmPassword: string = 'visibility_off';
  RegisterForm!: FormGroup;
  isPasswordBlur: boolean = false;
  isPasswordMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private register: RegistrationService,
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  //function for create a form while initializing registration page
  createForm() {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6789][0-9]{9}'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        ),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  //function for hide show password
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeIcon = 'remove_red_eye')
      : (this.eyeIcon = 'visibility_off');
    this.isText
      ? (this.typeOfPassword = 'text')
      : (this.typeOfPassword = 'password');
  }

  //function for hide show confirm password
  hideShowConfirmPassword() {
    this.isTextForConfirmPassword = !this.isTextForConfirmPassword;
    this.isTextForConfirmPassword
      ? (this.eyeIconConfirmPassword = 'remove_red_eye')
      : (this.eyeIconConfirmPassword = 'visibility_off');
    this.isTextForConfirmPassword
      ? (this.typeOfConfirmPassword = 'text')
      : (this.typeOfConfirmPassword = 'password');
  }

  // method calls when user press register button
  onRegister() {
    if (this.RegisterForm.valid && !this.isPasswordMatch) {
      // call api
      this.register.register(this.RegisterForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statuscode == 200) {
            this.router.navigate(['/']);
            this.notifyService.showSuccess('', res.message);
          } else {
            this.notifyService.showError('', res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('====================================');
      console.log(this.RegisterForm.value);
      console.log('====================================');
    }
  }

  // method for check if password field is blurred or not according to this margin is given to confirm password field
  validatePassword() {
    this.isPasswordBlur = true;
  }

  // method for check if confirm password and password is matched or not
  checkPassword() {
    var Password = this.RegisterForm.value.password;
    var ConfirmPassword = this.RegisterForm.value.confirmPassword;

    if (Password != ConfirmPassword) {
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
    }
  }
}
