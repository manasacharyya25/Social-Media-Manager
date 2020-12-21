import { Injectable } from '@angular/core';
import {SocialUser} from 'angularx-social-login'; 

@Injectable({providedIn: 'root'})
export class LoginService {
    facebookAccessToken: string;

    outputUserInformation(user: SocialUser) : void {
        if (user.provider == 'FACEBOOK') {
            this.facebookAccessToken = user.authToken;
        }
        console.log(user);
    }
}