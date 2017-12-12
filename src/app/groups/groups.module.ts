import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { GroupService } from './group.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupStartComponent } from './group-start/group-start.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupsComponent } from './groups.component';
import { GroupDeleteComponent } from './group-delete/group-delete.component';
import { ChatsModule } from '../chats/chats.module';
import { TagsModule } from '../tags/tags.module';
import { GroupRelatedComponent } from './group-related/group-related.component';

@NgModule({
  declarations: [
    GroupsListComponent,
    GroupStartComponent,
    GroupEditComponent,
    GroupDetailComponent,
    GroupDeleteComponent,
    GroupsComponent,
    GroupRelatedComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    GroupsRoutingModule,
    ChatsModule,
    TagsModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupsModule { }
