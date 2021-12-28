import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebSideRoutingModule } from './web-side-routing.module';
import {LayoutComponent} from "./components/layout/layout.component";
import { HomeComponent } from './pages/home/home.component';
import {SharedModule} from "../shared/shared.module";
import { HouseDetailComponent } from './pages/house-detail/house-detail.component';
import {SwiperModule} from "swiper/angular";
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StartComponent } from './pages/start/start.component';


@NgModule({
    declarations: [
        LayoutComponent,
        HomeComponent,
        HouseDetailComponent,
        StartComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        WebSideRoutingModule,
        SharedModule,
        SwiperModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class WebSideModule { }
