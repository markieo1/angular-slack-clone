import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { ChatsListComponent } from './chats-list/chats-list.component';

@NgModule({
  declarations: [
    ChatsListComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  exports: [ChatsListComponent]
})
export class ChatsModule { }
