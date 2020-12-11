import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginService } from './login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService, private loginService: LoginService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => this.loginService.outputUserInformation(user));
  }

  signInWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


}
