import { HttpClient, HttpHeaders, JsonpClientBackend } from "@angular/common/http";
import { Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from "@angular/core";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { FacebookService, InitParams, LoginOptions } from "ngx-facebook";
import { AppConfiguration } from "./common/appConfiguration";
import { User } from './common/user.model';

@Injectable({providedIn: 'root'})
export class SocialService
{
    newUser: User;

    constructor(private socialAuthService: SocialAuthService,
        private fbService: FacebookService, 
        private fbIntegrator: FacebookService,
        private router: Router,
        private httpClient: HttpClient) {
            
            //  1.  Initialize Facebook Service
            const initParams: InitParams = {
                appId: '836109743840031',   //Test App ID. Needs to change once Live 
                xfbml: true,
                version: 'v9.0',
            };
            this.fbService.init(initParams);
            this.fbIntegrator.init(initParams);

            //  2.  Subscribe to SocialAuthService  AuthStatus Change: Currently using for Google Sign In Only
            this.socialAuthService.authState.subscribe(response => {
                if(response != null) {
                    if(response.provider === 'GOOGLE') {
                        this.handleGoogleLogin(response);
                    }
                }
            });
        }
    
    login(platform: String): void {
        switch(platform) {
            case 'facebook':
                this.loginUsingFacebook();
                break;
            case 'google':
                this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
                break;
            case 'microsoft':
                console.log(AppConfiguration.NOT_IMPLEMENTED);
                break;
        }
    }

    logout(): void {
        localStorage.removeItem("IsLoggedIn");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_photoUrl");

        let provider = localStorage.getItem("Provider");
        /**
         * TODO:    Logout from logged in platform only
         */
        switch (provider) {
            case 'Google':
                this.socialAuthService.signOut().then(response => console.log('Logged Out')).catch(error => console.error('Error Logging Out'));
                break;
            case 'Facebook':
                this.fbService.logout().then(response => console.log('Logged Out')).catch(error => console.error('Error Logging Out'));
                break;
            default:
                break;
        }
        this.router.navigate(['']);
    }

    isLoggedIn(): boolean {
        if (localStorage.getItem("IsLoggedIn")==="true"){
            return true;
        }
        return false;
    }

    /**
     *  Google Login 
     */
    handleGoogleLogin(response) {
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("Provider", "Google");
        
        //  1.  Create User out of Response Object
        this.newUser = new User(response.name, response.email, response.photoUrl, AppConfiguration.GOOGLE, response.authToken);
        
        //  2.  Store User Information into Local Storage to be accessed by other components like Post, Navbar etc.
        this.storeUserInformation(response.name, response.email, response.photoUrl);
        
        //  3.  Make REST POST Call to Backend, to store User Data into Db
        this.httpClient.post(
            `${AppConfiguration.BACKEND_ENDPOINT}/users/login`, 
            this.newUser
        ).subscribe( response => {
            localStorage.setItem("user_id", response.toString());
        });

        //  4.  Route to Post Page
        this.router.navigate(['post']);
    }

    /**
     *  Facebook Login
     */
    loginUsingFacebook() {
        const loginOptions: LoginOptions = {
            scope: 'public_profile, email',
            return_scopes: true,
            enable_profile_selector: true
        };

        this.fbService.login(loginOptions).then((response)=>this.handleFbLogin(response));
    }

    async integrateFacebook() {
        const loginOptions: LoginOptions = {
            scope: 'public_profile, email, pages_show_list, pages_read_engagement, pages_manage_posts',
            return_scopes: true,
            enable_profile_selector: true
        };

        await this.fbIntegrator.login(loginOptions).then((response)=>this.handleFbIntegration(response));
    }

    handleFbIntegration(response) {
        console.log(response);
        const userId = localStorage.getItem("user_id");
        const fbUserId = response.authResponse.userID;
        const shortLivedUat = response.authResponse.accessToken;

        let obj = {"userId": userId, "fbUserId": fbUserId, "uat": shortLivedUat}

        this.httpClient.post(
            `${AppConfiguration.BACKEND_ENDPOINT}/social/facebook/integrate`, obj
        ).subscribe( (response:any) => {
            console.log(response);
        });        

    }

    async handleFbLogin(response) {
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("Provider", "Facebook");

        //  1.  Create User out of Response Object
        let user_name = null;
        let user_email = null;
        let user_photoUrl = null;
        let user_accessToken = response.authResponse.accessToken;

        await this.fbService.api('/me', 'get', {"fields":"name,email"}).then(response => {
            user_name = response.name;
            user_email = response.email;
        });
        
        await this.fbService.api('/me/picture?redirect=false','get', {"fields":"url"}).then(response => {
            user_photoUrl = response.data.url;
        });

        this.newUser = new User(user_name, user_email, user_photoUrl, AppConfiguration.FACEBOOK, user_accessToken);

        //  2.  Store User Information into Local Storage to be accessed by other components like Post, Navbar etc.
        this.storeUserInformation(user_name, user_email, user_photoUrl);

        //  3.  Make REST POST Call to Backend, to store User Data into Db
        this.httpClient.post(
            `${AppConfiguration.BACKEND_ENDPOINT}/users/login`, 
            this.newUser
        ).subscribe( response => {
            localStorage.setItem("user_id", response.toString());
        });

        //  4.  Route to Post Page
        this.router.navigate(['post']);

    }

    /**
     * Tumblr Integration
     */
    async integrateTumblr() {
        const user_id = localStorage.getItem("user_id"); 

        await this.httpClient.get<string>(
            `${AppConfiguration.BACKEND_ENDPOINT}/social/tumblr/initialize/${user_id}`,
        ).toPromise().then( (response:any) => {
            let authWindow = window.open(response.response, 'Authorize Access', 'height=570,width=520');

            // TODO:    Add eventListener to authWindow. Close on url changed.
        }).catch(error => window.alert("An Error Occured"));
    }

    /**
     * Twitter Integration
     */
    async integrateTwitter() {
        const user_id = localStorage.getItem("user_id"); 

        await this.httpClient.get<string>(
            `${AppConfiguration.BACKEND_ENDPOINT}/social/twitter/initialize/${user_id}`,
        ).toPromise().then( (response:any) => {
             let authWindow = window.open(response.response, 'Authorize Access', 'height=570,width=520');
             window.addEventListener('message', event => {console.log(event)});

            //  setTimeout(() => authWindow.close(), 15000);
            // // localStorage.setItem("url", response.response); 
            // // let authWindow = window.open(`https://localhost:4200/popup`, '', 'height=570,width=520');
            // authWindow.onclick = function(event) {
            //     authWindow.opener.postMessage("Clicked");
            // }
            // authWindow.focus();

            

            // window.addEventListener('message', event => {console.log(event)})


            // // authWindow.onload = function() {
            // //     authWindow.opener.postMessage("message", "*");
            // // }

            // setTimeout(() => {
            //     console.log("Posting");
            //     authWindow.opener.postMessage(authWindow.location.href, "*");
            //     authWindow.opener.alert("Will Close in 15secs");

                
            //     console.log("Posted");
            // }, 10000);

            // TODO:    Add eventListener to authWindow. Close on url changed.
        }).catch(error => window.alert("An Error Occured"));
    }
    
    /**
     *  Common Methods
     */
    storeUserInformation(name: string, email: string, photoUrl: string) {
        localStorage.setItem("user_name", name);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_photoUrl", photoUrl);
    }

}