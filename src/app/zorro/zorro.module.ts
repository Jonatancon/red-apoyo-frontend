import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
  ],
  exports: [
    NzLayoutModule,
  ]
})
export class ZorroModule { }
