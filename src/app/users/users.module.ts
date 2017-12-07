import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { UsersListComponent } from './users-list/users-list.component';
import { GroupsModule } from '../groups/group.module';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    GroupsModule
  ]
})
export class UsersModule { }
