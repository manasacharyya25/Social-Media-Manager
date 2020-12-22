import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authenticationService';
import { NavbarService } from './navbar.service';
import { User } from '../common/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string
  constructor(private authService: AuthenticationService, private navbarService: NavbarService) { }

  isSettingsEnabled: boolean;
  user_name: string;
  user_email: string;
  user_photoUrl: string;

  ngOnInit(): void {
    this.isSettingsEnabled = false;
    this.user_photoUrl = localStorage.getItem("user_photoUrl");
  }

  onSettingsClicked(): void {
    this.navbarService.settingsEnabled.next(!this.isSettingsEnabled);
    this.isSettingsEnabled = !this.isSettingsEnabled;
  }

  logout() : void {
    this.authService.logout();
  }
}
