import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authenticationService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn())
    {
      this.router.navigate(['post']);
    }
  }

  socialSignIn(platform: String) {
    this.authService.login(platform);
  }

  signInWithCredentials(): void {
    localStorage.setItem("IsLoggedIn", "true");
    this.router.navigate(['post']);
  }

  
}
