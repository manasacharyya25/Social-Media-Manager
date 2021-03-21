import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService } from '../socialService';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: SocialService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['post']);
    }
  }

  loginPage() {
    this.router.navigate(['login']);
  }

  socialSignIn(platform: String) {
    this.authService.login(platform);
  }
}
