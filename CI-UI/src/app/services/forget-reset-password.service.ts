import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgetResetPasswordService {
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient, private router: Router) {}

  forgetPassword(email: string) {
    return this.http.post<any>(`${this.baseUrl}ForgetPassword/${email}`, {});
  }

  resetPassword(email: string, token: string, newPassword: string) {
    return this.http.post<any>(
      `${this.baseUrl}ResetPassword/${email}/${token}/${newPassword}`,
      {}
    );
  }
}
