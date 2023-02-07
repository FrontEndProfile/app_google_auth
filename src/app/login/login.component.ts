import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // constructor(private authService: SocialAuthService) { }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }
  user: any;
  loggedIn: any;



  private accessToken = '';

  constructor(private authService: SocialAuthService, private httpClient: HttpClient) { }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  getGoogleCalendarData(): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((events) => {
        alert('Look at your console');
        console.log('events', events);
      });
  }

  // refreshToken(): void {
  //   this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  // }



  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
}
