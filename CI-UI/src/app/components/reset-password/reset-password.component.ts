import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgetResetPasswordService } from 'src/app/services/forget-reset-password.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  tokenForPasswordReset: string = '';
  resetPasswordForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  isTextForConfirmPassword: boolean = false;
  eyeIcon: string = 'visibility_off';
  eyeIconConfirmPassword: string = 'visibility_off';
  typeOfPassword: string = 'password';
  typeOfConfirmPassword: string = 'password';
  isPasswordBlur: boolean = false;
  isPasswordMatch: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resetPassService: ForgetResetPasswordService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.email = params['email'];
      this.tokenForPasswordReset = params['token'];
    });

    this.createForm();
  }

  //function for create a form while initializing reset password page
  createForm() {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          ),
        ],
      ],

      confirmPassword: ['', [Validators.required]],
    });
  }

  //method calls when user press change password button
  onReset() {
    if (this.resetPasswordForm.valid && !this.isPasswordMatch) {
      this.resetPassService
        .resetPassword(
          this.email,
          this.tokenForPasswordReset,
          this.resetPasswordForm.value['password']
        )
        .subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.router.navigate(['/']);
              // alert(res.statusCode);
              this.notifyService.showSuccess('', res.message);
            } else {
              // alert(res.statusCode);

              this.notifyService.showError('', res.message);
            }
            // console.log(res);
          },
          error: (err) => {
            this.notifyService.showError(
              '',
              'Request failed please generate another request'
            );
          },
        });
    }
  }

  //function for hide show New password
  hideShowNewPassword() {
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

  // method for check if confirm password and new password is matched or not
  checkPassword() {
    var Password = this.resetPasswordForm.value.password;
    var ConfirmPassword = this.resetPasswordForm.value.confirmPassword;

    if (Password != ConfirmPassword) {
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
    }
  }
}
