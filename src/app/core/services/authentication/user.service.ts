import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserModel} from "../../models/user.model";
import {MessageModel} from "../../models/message.model";
import {LoginModel} from "../../models/login.model";
import {TokenModel} from "../../models/token.model";
import {tap} from "rxjs/operators";
import {TokenService} from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUser = environment.AUTHENTICATION;

  constructor(
    private httpClient:HttpClient,
    private tokenService: TokenService
    ) { }

  createdUser (newUser:UserModel) {
    return this.httpClient.post<MessageModel>(`${this.urlUser}/new-user`, newUser);
  }

  loginUser (login:LoginModel) {
    return this.httpClient.post<TokenModel>(`${this.urlUser}/login`, login)
      .pipe(
        tap(response => this.tokenService.seveToken(response.token))
      );
  }

  refreshToken (token: TokenModel) {
    return this.httpClient.post<TokenModel>(`${this.urlUser}/refresh-token`, token)
      .pipe(
        tap(response => this.tokenService.seveToken(response.token))
      );
  }

}
