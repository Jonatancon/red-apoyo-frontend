import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/authentication/user.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {TokenService} from "../../../core/services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  hide = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private notificacion: NzNotificationService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  login(event:Event) {
    event.preventDefault();
    this.loading = true;
    this.userService.loginUser(this.form.value).subscribe(
      data => {
        this.createNotificacion('success', 'Ingreso Correcto',
          `Bienvenido: ${this.tokenService.getUserName()}`);
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error => {
        this.createNotificacion('error', 'Algo Salio Mal', 'Verifica tus datos, Algo esta mal');
        this.loading = false;
      }
    );
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createNotificacion(type:string, title:string, content:string){
    this.notificacion.create(type, title, content);
  }

}
