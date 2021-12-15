import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
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
