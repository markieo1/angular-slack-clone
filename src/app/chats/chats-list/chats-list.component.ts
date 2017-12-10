import { Component, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { ChatMessage } from '../chat.model';
import { ChatService } from '../chat.service';
import { MdcList } from '@angular-mdc/web';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: 'chats-list.component.html',
  styleUrls: ['chats-list.component.scss']
})
export class ChatsListComponent extends BaseComponent {
  @ViewChild(MdcList)
  public mdcList: MdcList;

  /**
   * The group id to display the chats for
   */
  @Input()
  public set groupId(groupId) {
    this._groupId = groupId;

    if (groupId) {
      this.loadMessages();
    }
  }

  public messages: ChatMessage[];
  public currentUserId: string;

  private _groupId: string;

  constructor(private chatService: ChatService, private authService: AuthService) {
    super();
    this.messages = [];
    this.currentUserId = this.authService.getUser().id;
  }

  /**
   * Loads the messages
   */
  private loadMessages() {
    this.chatService.getAll(this._groupId).subscribe((messages) => {
      this.messages = messages;

      setTimeout(() => {
        if (this.mdcList) {
          this.mdcList.ngAfterContentInit();
        }
      }, 100);
    });
  }
}
