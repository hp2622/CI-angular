import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetResetPasswordService } from 'src/app/services/forget-reset-password.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.scss'],
})
export class ForgetPasswordFormComponent implements OnInit {
  forgetPassForm!: FormGroup;
  email: string = '';
  buttonDisabled: boolean = false;
  ngOnInit(): void {
    this.createForm();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forgetPassService: ForgetResetPasswordService,
    private notifyService: NotificationService
  ) {}
  createForm() {
    this.forgetPassForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  forgetPass() {
    this.buttonDisabled = true;
    if (this.forgetPassForm.valid) {
      this.email = this.forgetPassForm.value['email'];
      // call api
      this.forgetPassService.forgetPassword(this.email).subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.notifyService.showSuccess('', res.message);
          } else {
            this.notifyService.showError('', res.message);
          }
          console.log(res);
        },
        error: (err) => {
          this.notifyService.showError('', 'Request failed');
        },
      });
    } else {
      console.log(this.forgetPassForm.value['email']);
    }
  }
}
