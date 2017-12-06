import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'app/users/login/login.component';
import { UsersRoutingModule } from 'app/users/users-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    UsersRoutingModule
  ],
  providers: []
})
export class UsersModule { }
