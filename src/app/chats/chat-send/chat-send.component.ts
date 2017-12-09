import { Component, } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';

@Component({
  selector: 'app-chat-send',
  templateUrl: 'chat-send.component.html',
})
export class ChatSendComponent extends BaseComponent {
  constructor() {
    super();
  }
}
