import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { GroupService } from './group.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [
    GroupsListComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    GroupsRoutingModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupsModule { }
