import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { NewhouseComponent } from './pages/newhouse/newhouse.component';
import { LayoutComponent } from './components/layout/layout.component';
import {MaterialModule} from "../material/material.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AnfitrionComponent } from './pages/anfitrion/anfitrion.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import {ZorroModule} from "../zorro/zorro.module";


@NgModule({
  declarations: [
    NewhouseComponent,
    LayoutComponent,
    AnfitrionComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ZorroModule
  ]
})
export class ProfileModule { }
