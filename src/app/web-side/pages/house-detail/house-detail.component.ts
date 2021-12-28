import { Component, OnInit } from '@angular/core';
import {HouseModel} from "../../../core/models/house.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HouseService} from "../../../core/services/house/house.service";
import {map, switchMap} from "rxjs";
import {Location} from "@angular/common";
import {ReservaService} from "../../../core/services/reservas/reserva.service";
import {DisponibilidadModel} from "../../../core/models/disponibilidad.model";
import {TokenService} from "../../../core/services/token/token.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CalificacionCasasService} from "../../../core/services/calificaciones/calificacionCasas.service";
import {CalificacionCasaModel} from "../../../core/models/calificacionCasa.model";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {

  houseId: string | null = null;
  reputacion: number = 0;
  house: HouseModel | null = null;
  reserva: DisponibilidadModel | null = null;
  calificacion: CalificacionCasaModel[]   = [];
  img: string = '';
  imgDefault: string = './assets/img/default.jpg'

  // @ts-ignore
  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private location: Location,
    private reservaService: ReservaService,
    private tokenService: TokenService,
    private navigate: Router,
    private formsBuilder: FormBuilder,
    private calificacionCasa: CalificacionCasasService
  ) { this.buildForm(); }

  ngOnInit(): void {
    this.loadHouse();
    this.loadComentarios();
  }

  goToBack() {
    this.location.back();
  }

  imgError() {
    this.img = this.imgDefault;
  }

  onSaveReserver(event: Event){
    if (!this.tokenService.isLogged()) {
      this.navigate.navigate(['/user/login']);
    }
    this.reservaService.saveReserva(this.form.value).subscribe( (data) => {
      console.log(data.usuarioReserver);
    },
      (error) => {
      console.log(error);
      });
  }

  buildForm() {
    this.form = this.formsBuilder.group({
      idCasa:[this.houseId],
      fechaInicial: ['', [Validators.required]] ,
      fechaFinal: ['', [Validators.required]]
    });
  }

  loadHouse() {
    this.route.paramMap
      .pipe(
        switchMap(
          (params) => {
            this.houseId = params.get('id');
            if (this.houseId) {
              return this.houseService.getOneHouse(this.houseId);
            }
            return [null];
          })
      )
      .subscribe( (data) => {
        this.house = data;
      });
  }

  loadComentarios() {
    this.route.paramMap
      .pipe(
        switchMap(
          (params) => {
            this.houseId = params.get('id');
            if (this.houseId) {
              return this.calificacionCasa.getAllCalificacionesByIdCasa(this.houseId);
            }
            return [null];
          })
      )
      .pipe(
        // @ts-ignore
        map(value => value.map(item => {
          this.reputacion += item.puntajeCasa;
        }))
      )
      .subscribe( (data) => {
        // @ts-ignore
        this.calificacion = data;
      });
  }

}
