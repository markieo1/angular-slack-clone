import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserDeleteComponent,
    UserDetailComponent,
    UserEditComponent,
    UserStartComponent,
    UsersListComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
