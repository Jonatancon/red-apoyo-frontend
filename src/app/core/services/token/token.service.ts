import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = 'AuthToken';
const TOKEN_COUNTRY = 'AuthTokenCountry'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }


  seveToken(token: string | null): void {
    window.localStorage.removeItem(TOKEN_KEY);
    if (typeof token === "string") {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  }

  saveTokenCountry (token: string) : void {
    window.localStorage.removeItem(TOKEN_COUNTRY);
    window.localStorage.setItem(TOKEN_COUNTRY, token);
  }

  getTokenCountry (): string | null {
    return localStorage.getItem(TOKEN_COUNTRY);
  }


  getToken (): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  getUserName (): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    // @ts-ignore
    const payLoad = token.split('.')[1];
    const payLoadDecoded = atob(payLoad);
    const values = JSON.parse(payLoadDecoded);

    return values.sub;
  }

  isAnfitrion (): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    // @ts-ignore
    const payLoad = token.split('.')[1];
    const payLoadDecoded = atob(payLoad);
    const values = JSON.parse(payLoadDecoded);
    const roles = values.roles;

    return roles.indexOf('ANFITRION') >= 0;
  }

  logOut (): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
