import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },

        setParams: { data: `Bearer ${token}` },
      });
    }
    //next called pipeline
    return next.handle(request);
  }
}
