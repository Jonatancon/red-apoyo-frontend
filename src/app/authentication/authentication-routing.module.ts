import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewUserComponent} from "./page/new-user/new-user.component";
import {LoginComponent} from "./page/login/login.component";

const routes: Routes = [
  {
   path:'',
   redirectTo: 'new-user',
   pathMatch: 'full'
  },
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
