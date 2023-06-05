import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ForgetPasswordFormComponent } from './components/forget-password-form/forget-password-form.component';
import { BannerComponent } from './components/banner/banner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ForgetPasswordFormComponent,
    BannerComponent,
    LandingPageComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],

  //provide interceptors using provider
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
