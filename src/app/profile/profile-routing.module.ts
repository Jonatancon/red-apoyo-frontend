import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {NewhouseComponent} from "./pages/newhouse/newhouse.component";
import {UsuarioComponent} from "./pages/usuario/usuario.component";
import {AnfitrionComponent} from "./pages/anfitrion/anfitrion.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'new-house',
        pathMatch: 'full'
      },
      {
        path: 'new-house',
        component: NewhouseComponent
      },
      {
        path: 'profile-user',
        component: UsuarioComponent
      },
      {
        path: 'profile-anfitrion',
        component: AnfitrionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
