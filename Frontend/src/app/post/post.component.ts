import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isSettingsEnabled: boolean;

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.settingsEnabled.subscribe(didSettingsEnable => {this.isSettingsEnabled = didSettingsEnable});
  }

}
