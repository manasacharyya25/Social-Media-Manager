import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authenticationService';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string
  constructor(private authService: AuthenticationService, private navbarService: NavbarService) { }

  isSettingsEnabled: boolean;

  ngOnInit(): void {
    this.isSettingsEnabled = false;
  }

  onSettingsClicked(): void {
    this.navbarService.settingsEnabled.next(!this.isSettingsEnabled);
    this.isSettingsEnabled = !this.isSettingsEnabled;
  }

  logout() : void {
    this.authService.logout();
  }
}
