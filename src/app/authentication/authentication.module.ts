import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './page/login/login.component';
import { NewUserComponent } from './page/new-user/new-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import { LayoutComponent } from './moduls/layout/layout.component';
import {ZorroModule} from "../zorro/zorro.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    NewUserComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ZorroModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
