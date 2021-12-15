import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs";
import {TokenService} from "../token/token.service";
import {TokenCountryModel} from "../../models/token-country.model";
import {CountriesModel} from "../../models/countries.model";
import {StatesModel} from "../../models/states.model";
import {CityModel} from "../../models/city.model";
import { checkCountry } from "../../interceptor/country/country.interceptor";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private access = environment.COUNTRY_AUTHENTICATION;
  private urlAccess = environment.COUNTRY_URL;

  constructor(
    private httpClient:HttpClient,
    private tokenService: TokenService
  ) { }

  loginCountry(){
    return this.httpClient.get<TokenCountryModel>(`${this.urlAccess}/getaccesstoken`,{
      headers: {
        'Accept': "application/json",
        'api-token': this.access,
        'user-email': "jhonatanlora2011@gmail.com"
      }
    })
      .pipe(
        tap(response => this.tokenService.saveTokenCountry(response.auth_token))
      );
  }

  getAllCountries () {
    return this.httpClient.get<CountriesModel[]>(`${this.urlAccess}/countries`, {
      context: checkCountry()
    });
  }

  getAllStates (country: string) {
    return this.httpClient.get<StatesModel[]>(`${this.urlAccess}/states/${country}`, {
      context: checkCountry()
    });
  }

  getAllcities(state:string) {
    return this.httpClient.get<CityModel[]>(`${this.urlAccess}/cities/${state}`, {
      context: checkCountry()
    });
  }

}
