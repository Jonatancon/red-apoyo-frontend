import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "./components/nav/nav.component";
import { ImgComponent } from './components/img/img.component';
import { HouseComponent } from './components/house/house.component';
import {RouterModule} from "@angular/router";
import { HousesComponent } from './components/houses/houses.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {ZorroModule} from "../zorro/zorro.module";

@NgModule({
  declarations: [
    NavComponent,
    ImgComponent,
    HouseComponent,
    HousesComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ZorroModule
  ],
  exports: [
    NavComponent,
    ImgComponent,
    HouseComponent,
    HousesComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
