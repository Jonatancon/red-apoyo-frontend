import {Injectable} from '@angular/core';
import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "../../services/token/token.service";

const CHECK_COUNTRY = new HttpContextToken<boolean>( () => false);

export function checkCountry() {
  return new HttpContext().set(CHECK_COUNTRY, true);
}

const AUTHORIZATION = 'Authorization';

@Injectable()
export class CountryInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_COUNTRY)) {
      request = this.addToken(request);
    }
    return next.handle(request);
  }

  private addToken (request: HttpRequest<unknown>) {
    const token = this.tokenService.getTokenCountry();

    if (token) {
      return request.clone({
        headers: request.headers.set(AUTHORIZATION, `Bearer ${token}`)
      });
    }
    return request;
  }
}
