import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module')
      .then(modulo => modulo.CmsModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./authentication/authentication.module')
      .then(modulo => modulo.AuthenticationModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module')
      .then(modulo => modulo.ProfileModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./web-side/web-side.module')
      .then(modulo => modulo.WebSideModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
