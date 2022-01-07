import { Component, OnInit } from '@angular/core';
import {HouseModel} from "../../../core/models/house.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HouseService} from "../../../core/services/house/house.service";
import {map, switchMap} from "rxjs";
import {formatDate, Location} from "@angular/common";
import {ReservaService} from "../../../core/services/reservas/reserva.service";
import {DisponibilidadModel} from "../../../core/models/disponibilidad.model";
import {TokenService} from "../../../core/services/token/token.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CalificacionCasasService} from "../../../core/services/calificaciones/calificacionCasas.service";
import {CalificacionCasaModel} from "../../../core/models/calificacionCasa.model";

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UserModel} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/authentication/user.service";
registerLocaleData(en);

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {

  houseId: string | null = null;
  reputacion: number = 0;
  reputacionAnfitrion: number = 0;
  house: HouseModel | null = null;
  user: UserModel | null = null;
  reserva: DisponibilidadModel | null = null;
  calificacion: CalificacionCasaModel[] | null   = [];
  img: string = '';
  imgDefault: string = './assets/img/default.jpg'
  loading = true;
  loadingReserva = false;
  loadingComentarios = true;
  infoUser = false;

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
    private calificacionCasa: CalificacionCasasService,
    private notificacion: NzNotificationService,
    private userService: UserService
  ) {
    this.buildForm();
  }

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
    this.loadingReserva = true;
    if (!this.tokenService.isLogged()) {
      this.createNotificacion('warning', 'Inicio de seccion requerido',
        'Se requiere que inicie seccion para poder reservar la casa');
      this.navigate.navigate(['/user/login']);
    }else{
      this.form.get('iDcasa')?.setValue(this.houseId);
      this.form.get('fechaInicial')?.setValue(
        formatDate(this.form.get('fechaInicial')?.value, 'dd/MM/yyyy', 'en-Us'));
      this.form.get('fechaFinal')?.setValue(
        formatDate(this.form.get('fechaFinal')?.value, 'dd/MM/yyyy', 'en-Us'));

      this.reservaService.saveReserva(this.form.value).subscribe(
        (data) => {
          this.createNotificacion('success', 'Reserva Guardada',
            `Su reserva esta hecha, fecha de llegada: ${data.fechaInicial} fecha de salida: ${data.fechaFinal}`);
          this.loadingReserva = false;
          this.navigate.navigate(
            [this.tokenService.isAnfitrion()?'/profile/profile-anfitrion':'/profile/profile-user']);
        },
        (error) => {
          this.createNotificacion('error', 'Error',
            `Lo sentimos La fecha que selecciono ya esta recervada......: ${error.error.message}`);
          this.loadingReserva = false;
        });
    }
  }

  buildForm() {
    this.form = this.formsBuilder.group({
      iDcasa:[''],
      fechaInicial: ['', [Validators.required]] ,
      fechaFinal: ['', [Validators.required]],
      usuarioReserver: [''],
      calificoUsuario: [''],
      calificoAnfitrion: [''],
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
        // @ts-ignore
        this.img = data.urlFoto;
        this.loading = false;
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
      .subscribe( (data) => {
        this.calificacion = data;
        this.loadingComentarios = false;
        // @ts-ignore
        data.map( item => {
          this.reputacion+= item.puntajeCasa;
        });
      });
  }

  createNotificacion(type: string, title: string, content: string){
    this.notificacion.create(type, title, content);
  }

  open() {
    this.infoUser = true;
    // @ts-ignore
    this.userService.dataUser(this.house?.idPropietario).subscribe(
      (data) => {
        this.user = data;
      }
    );
    // @ts-ignore
    this.calificacionCasa.getAllCalificacionesByUserName(this.house?.idPropietario).pipe(
      map(data => data.map(item => {
        this.reputacionAnfitrion+= item.puntajeAnfitrion;
      }))
    ).subscribe();
  }

  close() {
    this.infoUser = false;
  }

}
