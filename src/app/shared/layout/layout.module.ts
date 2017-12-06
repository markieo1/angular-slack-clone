import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import {
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMaterialIconModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcToolbarModule,
  MdcTypographyModule,
} from '@angular-mdc/web';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    FlexLayoutModule,
    MdcButtonModule,
    MdcCardModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconModule,
    MdcIconToggleModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcMaterialIconModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcRippleModule,
    MdcSelectModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTabModule,
    MdcTextFieldModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcTypographyModule,
  ]
})
export class LayoutModule { }
