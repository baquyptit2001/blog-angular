import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
}

  constructor(public jwtHelper: JwtHelperService) { }
}
