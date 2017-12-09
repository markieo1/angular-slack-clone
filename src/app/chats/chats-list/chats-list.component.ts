import { Component, } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';

@Component({
  selector: 'app-chats-list',
  templateUrl: 'chats-list.component.html',
  styleUrls: ['chats-list.component.scss']
})
export class ChatsListComponent extends BaseComponent {
  constructor() {
    super();
  }
}
