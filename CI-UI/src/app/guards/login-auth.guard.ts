import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private login: LoginServiceService, private router: Router) {}

  //function for checking the token valid and time not exceeded of token and redirect according to this
  canActivate() {
    console.log(this.login.isLoggedIn());
    if (this.login.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
