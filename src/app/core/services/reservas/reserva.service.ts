import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DisponibilidadModel} from "../../models/disponibilidad.model";
import {checkApi} from "../../interceptor/generic/generic.interceptor";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlReserva = environment.RESERVA_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  saveReserva(reserva: DisponibilidadModel) {
    return this.httpClient.post<DisponibilidadModel>(`${this.urlReserva}/save`, reserva, {
      context: checkApi()
    });
  }

  getAllReservedFromHouse(id:string) {
    return this.httpClient.get<DisponibilidadModel[]>(`${this.urlReserva}/obtener/${id}`)
  }
}
