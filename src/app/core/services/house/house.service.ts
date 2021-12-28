import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HouseModel} from "../../models/house.model";
import {environment} from "../../../../environments/environment";
import {MessageModel} from "../../models/message.model";
import {checkApi} from "../../interceptor/generic/generic.interceptor";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private urlHouse = environment.HOUSE_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  saveHouse (house: HouseModel) {
    return this.httpClient.post<MessageModel>(`${this.urlHouse}/casas/guardar`, house, {
      context: checkApi()
    });
  }

  getAllHouse() {
    return this.httpClient.get<HouseModel[]>(`${this.urlHouse}/casas/busqueda/todas`);
  }

  getOneHouse(id:String) {
    return this.httpClient.get<HouseModel>(`${this.urlHouse}/casas/busqueda/${id}`);
  }
}
