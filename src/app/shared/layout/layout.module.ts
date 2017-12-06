import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import {
  MdcButtonModule,
  MdcFabModule,
  MdcMenuModule,
  MdcToolbarModule,
  MdcIconModule,
  MdcMaterialIconModule,
  MdcDrawerModule,
  MdcListModule,
  MdcRippleModule
} from '@angular-mdc/web';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    FlexLayoutModule,
    MdcButtonModule,
    MdcFabModule,
    MdcMenuModule,
    MdcToolbarModule,
    MdcIconModule,
    MdcMaterialIconModule,
    MdcDrawerModule,
    MdcListModule,
    MdcRippleModule
  ]
})
export class LayoutModule { }
