import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialService } from '../socialService';

@Injectable({providedIn: "root"})
export class SettingsService {

    constructor(private httpClient: HttpClient, private socialService: SocialService) {}

    async integrateFacebook() {
        await this.socialService.integrateFacebook();
    }

    async integrateTumblr() {
        await this.socialService.integrateTumblr();
    }

    async integrateTwitter() {
        await this.socialService.integrateTwitter();
    }
}