import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate{

    constructor(public router: Router) {}

    canActivate(): boolean {
        if (!(localStorage.getItem("IsLoggedIn")==="true")){
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}