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
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ScrollDownDirective } from './scroll-down/scroll-down.directive';
import { ScrollableListDirective } from './scrollable-list/scrollable-list.directive';
import { Select2Module } from 'ng2-select2';
import { InfiniteScrollUpDirective } from './infinite-scroll-up/infinite-scoll-up.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    ScrollDownDirective,
    ScrollableListDirective,
    InfiniteScrollUpDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutRoutingModule,
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
    Select2Module
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
    ScrollDownDirective,
    ScrollableListDirective,
    Select2Module,
    InfiniteScrollUpDirective
  ]
})
export class LayoutModule { }
