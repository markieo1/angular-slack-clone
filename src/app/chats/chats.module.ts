import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatSendComponent } from './chat-send/chat-send.component';
import { ChatService } from './chat.service';
import { ChatDeleteComponent } from './chat-delete/chat-delete.component';
import { ChatEditComponent } from './chat-edit/chat-edit.component';

@NgModule({
  declarations: [
    ChatsListComponent,
    ChatSendComponent,
    ChatDeleteComponent,
    ChatEditComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  exports: [
    ChatsListComponent,
    ChatSendComponent
  ],
  providers: [
    ChatService
  ]
})
export class ChatsModule { }
