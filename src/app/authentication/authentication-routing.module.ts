import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewUserComponent} from "./page/new-user/new-user.component";
import {LoginComponent} from "./page/login/login.component";
import {LayoutComponent} from "./moduls/layout/layout.component";

const routes: Routes = [
  {
   path:'',
   component: LayoutComponent,
   children: [
     {
       path: '',
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
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
