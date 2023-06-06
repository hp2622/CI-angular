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
  data: Array<any>;
  MissionData: Array<any>;
  totalRecords!: number;
  totalRecordsOfMission!: number;
  page: any = 1;
  pageforMission: any = 1;
  constructor(
    private login: LoginServiceService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.data = new Array<any>();
    this.MissionData = new Array<any>();
  }

  ngOnInit(): void {
    this.getAllUser();
    this.getAllMission();
  }

  //call get all user api
  getAllUser() {
    this.login.getFakeUsers().subscribe({
      next: (res) => {
        this.data = res.results;
        this.totalRecords = res.results.length;
        console.log(res);
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

  getAllMission() {
    this.login.getMissions().subscribe({
      next: (res) => {
        this.MissionData = res.data;
        this.totalRecordsOfMission = res.data.length;
        console.log(res.data[0]);
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
