import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CalificacionCasaModel} from "../../models/calificacionCasa.model";
import {MessageModel} from "../../models/message.model";
import {checkApi} from "../../interceptor/generic/generic.interceptor";

@Injectable({
  providedIn: 'root'
})
export class CalificacionCasasService {

  calificacionUrl = environment.CALIFICACION_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  saveNewCalificacion(calificacion: CalificacionCasaModel) {
    return this.httpClient.post<MessageModel>(`${this.calificacionUrl}/save`, calificacion, {
      context: checkApi()
    });
  }

  getAllCalificacionesByIdCasa(id: string) {
    return this.httpClient.get<CalificacionCasaModel[]>(`${this.calificacionUrl}/obtener/${id}`);
  }
}
