import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialService } from '../socialService';

@Injectable({providedIn: "root"})
export class SettingsService {

    constructor(private httpClient: HttpClient, private socialService: SocialService) {}

    integrateFacebook(): void {
        this.socialService.integrateFacebook();
    }

    integrateTumblr(): void {
        this.socialService.integrateTumblr();
    }

    integrateTwitter(): void {
        this.socialService.integrateTwitter();
    }
}