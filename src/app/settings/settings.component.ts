import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettings } from 'src/app/common/user_settings.model';
import { User } from '../common/user.model';
import { AppConfiguration } from '../common/appConfiguration';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  userSettings: UserSettings;
  userId: number;

  constructor(private httpClient: HttpClient, private settingsService: SettingsService) { 
    this.userId = +localStorage.getItem("user_id");
    this.userSettings = new UserSettings(this.userId);
  }

  ngOnInit(): void {
    this.getUserSettings(this.userId);
  }

  ngOnDestroy(): void {
    this.setUserSettings(this.userSettings);
  }


  getUserSettings(user_id: number) : void {
    this.httpClient.get(
      `${AppConfiguration.BACKEND_ENDPOINT}/users/settings/${user_id}`
    ).subscribe( (response: UserSettings) => {
      this.userSettings = response;
    })
  }

  setUserSettings(userSettings: UserSettings): void {
    userSettings.userId =  this.userId;

    this.httpClient.post(
      `${AppConfiguration.BACKEND_ENDPOINT}/users/settings`,
      userSettings
    ).subscribe((response: UserSettings) => {
      this.userSettings = response;
    })
  }

  async integratePlatform($event: any) {
    var platform = $event.target.id;
    var pref = $event.target.checked;

    this.isLoading = true;
    switch (platform) {
      case 'facebook':
        this.userSettings.facebookIntegrated = pref;
        if(pref) {
          await this.settingsService.integrateFacebook();
        }
        break;
      case 'instagram':
        this.userSettings.instagramIntegrated = pref;
        break;
      case 'twitter':
        this.userSettings.twitterIntegrated = pref;
        if(pref) {
          await this.settingsService.integrateTwitter();
        }
        break;
      case 'tumblr':
        this.userSettings.tumblrIntegrated = pref;
        if(pref) {
          await this.settingsService.integrateTumblr();
        }
        break;
      case 'reddit':
        this.userSettings.redditIntegrated = pref;
        break;
      case 'linkedin':
        this.userSettings.linkedinIntegrated = pref;
        break;
      default:
        console.log($event);
    }
    this.isLoading = false;
  }

}
