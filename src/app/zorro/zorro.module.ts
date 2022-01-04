import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { NzSpaceModule } from 'ng-zorro-antd/space';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzAutocompleteModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzImageModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzDrawerModule,
    NzGridModule,
    NzDividerModule,
    NzProgressModule,
    NzSkeletonModule,
    NzRateModule,
    NzCommentModule,
    NzPageHeaderModule,
    NzNotificationModule,
    NzCheckboxModule
  ],
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzAutocompleteModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzImageModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzDrawerModule,
    NzGridModule,
    NzDividerModule,
    NzProgressModule,
    NzSkeletonModule,
    NzRateModule,
    NzCommentModule,
    NzPageHeaderModule,
    NzNotificationModule,
    NzCheckboxModule
  ],
  providers   : [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class ZorroModule {}
