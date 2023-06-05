import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public users: any = [];

  constructor(
    private login: LoginServiceService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  //call get all user api
  getAllUser() {
    this.login.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        localStorage.clear();
        this.router.navigate(['/']);
        this.notifyService.showError(
          '',
          'Please Login again with Appropriate Credentials!!'
        );
      },
    });
  }

  //function for logout
  logout() {
    this.login.signOut();
  }
}
