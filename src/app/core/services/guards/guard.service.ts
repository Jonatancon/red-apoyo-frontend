import { Injectable } from '@angular/core';
import {TokenService} from "../token/token.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  realRol: string | undefined;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |
                UrlTree> | boolean | UrlTree {

    const expectedRol = route.data['expectedRol'];
    this.realRol = this.tokenService.isAnfitrion() ? 'admin' : 'user';

    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
