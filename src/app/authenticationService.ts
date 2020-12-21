import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
    constructor(private router: Router) {}

    isLoggedIn(): boolean {
        if (localStorage.getItem("IsLoggedIn")==="true"){
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem("IsLoggedIn");
        this.router.navigate(['']);
    }

    login(): void {

    }
}