import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ForgetPasswordFormComponent } from './components/forget-password-form/forget-password-form.component';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordFormComponent,
  },
  {
    path: 'landingPage',
    component: LandingPageComponent,
    canActivate: [LoginAuthGuard],
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
