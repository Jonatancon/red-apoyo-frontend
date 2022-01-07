import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/authentication/user.service";
import {TokenService} from "../../../core/services/token/token.service";
import {CalificacionUsuarioService} from "../../../core/services/calificaciones/calificacion-usuario.service";

import {CalificacionUsuarioModel} from "../../../core/models/calificacionUsuario.model";
import {DisponibilidadModel} from "../../../core/models/disponibilidad.model";
import {ReservaService} from "../../../core/services/reservas/reserva.service";
import {HouseService} from "../../../core/services/house/house.service";
import {HouseModel} from "../../../core/models/house.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CalificacionCasasService} from "../../../core/services/calificaciones/calificacionCasas.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  // @ts-ignore
  form: FormGroup
  idCasa = ''

  user: UserModel | null = null;
  reservas: DisponibilidadModel[] = [];
  calificacion: CalificacionUsuarioModel[] = [];
  userName: string | null = '';
  loadingUser = true;
  loadingReservas = true;
  puntaje: number = 0;

  showHouseDetail = false;
  houseChosen: HouseModel | null = null;
  imgDefault: string = './assets/img/default.jpg';
  img: string = '';

  showModal = false;

  constructor(
    private userService: UserService,
    private calificacionCasa: CalificacionCasasService,
    private tokenService: TokenService,
    private calificacionUsuario: CalificacionUsuarioService,
    private reservasService: ReservaService,
    private houseService: HouseService,
    private formBuilder: FormBuilder,
    private notificacion: NzNotificationService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
    this.loadUser();
    this.loadCalificacion();
    this.loadReservas();
  }

  loadUser() {
    this.userService.dataUser(this.userName).subscribe(
      (data) => {
        this.user = data;
        this.loadingUser = false;
      }
    );
  }

  loadCalificacion() {
    this.calificacionUsuario.getAllCalificaciones(this.userName).subscribe(
      (data) => {
        this.calificacion = data;
        // @ts-ignore
        data.map(item => this.puntaje+= item.calificacion)
      }
    );
  }

  loadReservas() {
    this.reservasService.getAllReservasFromUserName(this.userName).subscribe(
      (data) => {
        this.reservas = data;
        this.loadingReservas = false
      }
    );
  }

  onShowDetail(id:string) {
    this.open();
    this.houseService.getOneHouse(id).subscribe(
      (data) => {
        this.houseChosen = data;
        this.img = data.urlFoto;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  open() {
    this.showHouseDetail = true;
  }

  close() {
    this.showHouseDetail = false;
  }

  imgError() {
    this.img = this.imgDefault;
  }

  handleCancel(){
    this.showModal = false;
  }

  handleOpen(id: string) {
    this.idCasa = id;
    this.showModal = true;
  }

  onSavePuntuacion(event: Event) {
    this.form.get('idUsuario')?.setValue(this.userName);
    this.form.get('idCasa')?.setValue(this.idCasa);

    this.calificacionCasa.saveNewCalificacion(this.form.value).subscribe(
      (data) => {
        this.notificacion.success('Calificacion gurdada',
          `Felicitaciones se ha guardado su calificacion......${data.message}`);
        this.handleCancel();
      },
      error => {
        this.notificacion.error('Error', error.error.message);
        this.handleCancel();
      }
    );
  }

  buildForm() {
    this.form = this.formBuilder.group({
      comentario: ['', [Validators.required]],
      puntajeCasa: [0, [Validators.required]],
      puntajeAnfitrion: [0, [Validators.required]],
      idCasa: [''],
      idUsuario: ['']
    });

  }

}
