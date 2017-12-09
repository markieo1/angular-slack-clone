import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { ChatService } from '../chat.service';
import { ChatMessage } from 'app/chats/chat.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-send',
  templateUrl: 'chat-send.component.html',
})
export class ChatSendComponent extends BaseComponent implements OnInit {

  /**
   * The group id to send the chats to
   */
  @Input()
  public set groupId(groupId) {
    if (groupId) {
      this.chatService.groupId = groupId;
    }
  }

  /**
   * The message currently being typed by the user
   */
  public message: string;

  /**
   * The message form
   */
  public messageForm: FormGroup;

  constructor(private chatService: ChatService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Sends a message
   */
  public onSubmit() {
    if (!this.message) {
      return;
    }

    const chatMessage = new ChatMessage();
    chatMessage.message = this.message;

    this.chatService.create(chatMessage).subscribe(() => {
      this.message = '';
    });
  }

  /**
  * Initializes the form
  */
  private initForm() {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }
}
