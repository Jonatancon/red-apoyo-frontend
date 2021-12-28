import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {HomeComponent} from "./pages/home/home.component";
import {HouseDetailComponent} from "./pages/house-detail/house-detail.component";
import {StartComponent} from "./pages/start/start.component";

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
      },
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'living-room',
        component: HomeComponent
      },
      {
        path: 'living-room/:id',
        component: HouseDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebSideRoutingModule { }
