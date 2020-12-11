import { Injectable } from '@angular/core';
import {SocialUser} from 'angularx-social-login'; 

@Injectable({providedIn: 'root'})
export class LoginService {
    outputUserInformation(user: SocialUser) : void {
        console.log(user.firstName + user.email);
    }
}