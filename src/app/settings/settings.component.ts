import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettings } from 'src/app/common/user_settings.model';
import { AppConfiguration } from '../common/appConfiguration';
import { SocialService } from '../socialService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  userSettings: UserSettings;
  userId: number;

  constructor(private httpClient: HttpClient, private socialService: SocialService) { 
    // this.userSettings = new UserSettings(this.userId);
    this.socialService.platformIntegrated.subscribe((didPlatformIntegrate:String) => this.platformIntegrated(didPlatformIntegrate));
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
    this.userId = +localStorage.getItem("user_id");

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
          await this.socialService.integrateFacebook();
        }
        break;
      case 'instagram':
        this.userSettings.instagramIntegrated = pref;
        break;
      case 'twitter':
        this.userSettings.twitterIntegrated = pref;
        if(pref) {
          await this.socialService.integrateTwitter();
        }
        break;
      case 'tumblr':
        this.userSettings.tumblrIntegrated = pref;
        if(pref) {
          await this.socialService.integrateTumblr();
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

  platformIntegrated(didPlatformIntegrate: String): void {
    let response =  didPlatformIntegrate.split(',')
    var platform = response[0];
    var didIntegrate = response[1];

    switch (platform) {
      case 'Tumblr':
          if (didIntegrate === 'Success') {
            this.userSettings.tumblrIntegrated = true;
          } else if (didIntegrate === 'Failure' || didIntegrate === 'Reset') {
            this.userSettings.tumblrIntegrated = false;
          }
          break;
      case 'Twitter':
        if (didIntegrate === 'Success') {
          this.userSettings.twitterIntegrated = true;
        } else if (didIntegrate === 'Failure' || didIntegrate === 'Reset') {
          this.userSettings.twitterIntegrated = false;
        }
        break;
      case 'Facebook':
        if (didIntegrate === 'Success') {
          this.userSettings.facebookIntegrated = true;
        } else if (didIntegrate === 'Failure' || didIntegrate === 'Reset') {
          this.userSettings.facebookIntegrated = false;
        }
        break;
      default:
        break;
    }
  }
}
