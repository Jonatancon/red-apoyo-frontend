import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CalificacionUsuarioModel} from "../../models/calificacionUsuario.model";

@Injectable({
  providedIn: 'root'
})
export class CalificacionUsuarioService {

  urlCalificacion = environment.CALIFICACION_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCalificaciones(id:string|null) {
    return this.httpClient.get<CalificacionUsuarioModel[]>(`${this.urlCalificacion}/user/obtener/${id}`);
  }
}
