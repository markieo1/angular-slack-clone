import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MdcButtonModule,
  MdcFabModule,
  MdcMenuModule
} from '@angular-mdc/web';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MdcButtonModule,
    MdcFabModule,
    MdcMenuModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
