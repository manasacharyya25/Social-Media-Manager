import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { FacebookService, InitParams } from "ngx-facebook";
import { Subject } from 'rxjs';
import { User } from './common/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
    newUser: User;

    constructor(private socialAuthService: SocialAuthService,
        private fb: FacebookService, 
        private router: Router,
        private httpClient: HttpClient) {
            const initParams: InitParams = {
                appId: '836109743840031',   //Test App ID. Needs to change once Live 
                xfbml: true,
                version: 'v9.0',
            };
            this.fb.init(initParams);
            this.socialAuthService.authState.subscribe((user) => this.handleGoogleLogin(user));
            this.httpClient = httpClient;
        }
    
    isLoggedIn(): boolean {
        if (localStorage.getItem("IsLoggedIn")==="true"){
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem("IsLoggedIn");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_photoUrl");
        this.router.navigate(['']);
    }

    login(platform: String): void {
        switch(platform) {
            case 'facebook':
                this.fb.login().then((response)=>this.handleFbLogin(response));
                break;
            case 'google':
                this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
                break;
            case 'microsoft':
                //signiniwithmicrosoft
                break;
        }
    }

    handleFbLogin(response) {
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("fb_access_token", response);
        this.router.navigate(['post']);
        console.log(response);
    }

    handleGoogleLogin(response) {
        this.newUser = new User(response.name, response.email, response.photoUrl, response.id, response.provider);


        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("google_access_token", response);
        this.storeUserInformation(response.name, response.email, response.photoUrl);
        // console.log(response); 

        this.httpClient.post(
            'http://localhost:8080/users/login', 
            this.newUser
        ).subscribe( response => {console.log(response)});
        this.router.navigate(['post']);
    }
    
    storeUserInformation(name: string, email: string, photoUrl: string) {
        localStorage.setItem("user_name", name);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_photoUrl", photoUrl);
    }

}