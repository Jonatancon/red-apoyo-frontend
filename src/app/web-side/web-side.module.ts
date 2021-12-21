import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebSideRoutingModule } from './web-side-routing.module';
import {LayoutComponent} from "./components/layout/layout.component";
import {NavComponent} from "./components/nav/nav.component";


@NgModule({
    declarations: [
        LayoutComponent,
        NavComponent
    ],
    exports: [
        NavComponent
    ],
    imports: [
        CommonModule,
        WebSideRoutingModule,
    ]
})
export class WebSideModule { }
