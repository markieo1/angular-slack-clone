import { Component, Input, ViewChild, Inject } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { ChatMessage } from '../chat.model';
import { ChatService } from '../chat.service';
import { MdcList } from '@angular-mdc/web';
import { ChatDeleteComponent } from '../chat-delete/chat-delete.component';
import { ChatEditComponent } from '../chat-edit/chat-edit.component';
import { AUTH_SERVICE } from '../../shared/auth/auth-service.token';
import { IAuthService } from '../../shared/auth/iauth-service.interface';

@Component({
  selector: 'app-chats-list',
  templateUrl: 'chats-list.component.html',
  styleUrls: ['chats-list.component.scss']
})
export class ChatsListComponent extends BaseComponent {
  @ViewChild(MdcList)
  public mdcList: MdcList;

  @ViewChild(ChatDeleteComponent)
  public chatDeleteComponent: ChatDeleteComponent;

  @ViewChild(ChatEditComponent)
  public chatEditComponent: ChatEditComponent;

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

  public get groupId() {
    return this._groupId;
  }

  public messages: ChatMessage[];
  public currentUserId: string;

  private _groupId: string;

  constructor(private chatService: ChatService, @Inject(AUTH_SERVICE) private authService: IAuthService) {
    super();
    this.messages = [];
    this.currentUserId = this.authService.getUser().id;
  }

  /**
   * Shows the edit dialog
   * @param chatMessage The message to edit
   */
  public editMessage(chatMessage: ChatMessage) {
    this.chatEditComponent.showDialog(chatMessage);
  }

  /**
   * Shows the delete dialog
   * @param chatMessage The message to delete
   */
  public deleteMessage(chatMessage: ChatMessage) {
    this.chatDeleteComponent.showDialog(chatMessage.id);
  }

  /**
   * Called when a message is edited or deleted
   */
  public onMessageChanged() {
    this.loadMessages();
  }

  /**
   * Refreshes the messages
   */
  public refreshMessages() {
    this.loadMessages();
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
