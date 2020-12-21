import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { FacebookService, InitParams } from "ngx-facebook";
import { LoginService } from './login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService, private fb: FacebookService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => this.loginService.outputUserInformation(user));

    const initParams: InitParams = {
      appId: '836109743840031',   //Test App ID. Needs to change once Live 
      xfbml: true,
      version: 'v9.0'
    };

    this.fb.init(initParams);
  }

  signInWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.fb.login().then((response)=>this.handleFbLogin(response));
  }

  signInWithCredentials(): void {
    console.log("Clicked");
    localStorage.setItem("IsLoggedIn", "true");
    this.router.navigate(['post']);
  }

  handleFbLogin(response) {
    localStorage.setItem("IsLoggedIn", "true");
    localStorage.setItem("fb_access_token", response);
    this.router.navigate(['post']);
  }

  getFbInfo(): void {
    this.fb.api('/me/feed').then((response)=>console.log(response));
  }

  signOutFb(): void {
    localStorage.removeItem("IsLoggedIn");
  }
}
