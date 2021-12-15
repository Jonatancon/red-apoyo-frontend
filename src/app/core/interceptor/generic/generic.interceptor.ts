import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, concatMap, Observable, throwError} from 'rxjs';
import {TokenService} from "../../services/token/token.service";
import {UserService} from "../../services/authentication/user.service";
import {TokenModel} from "../../models/token.model";

const AUTHORIZATION = 'Authorization';

@Injectable()
export class GenericInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenService.isLogged()){
      return next.handle(request);
    }
    request = this.addToken(request);

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const dto:TokenModel = {
          token: this.tokenService.getToken()
        }
        return this.userService.refreshToken(dto).pipe(concatMap(() => {
          request = this.addToken(request);
          return next.handle(request);
        }));
      } else {
        //this.tokenService.logOut();
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();

    if (token) {
      return request.clone({
        headers: request.headers.set(AUTHORIZATION, `Bearer ${token}`)
      });
    }
    return request;
  }
}
