import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
}
