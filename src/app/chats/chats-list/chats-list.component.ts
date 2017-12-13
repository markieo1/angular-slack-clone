import { Component, Input, ViewChild, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { ChatMessage } from '../chat.model';
import { ChatService } from '../chat.service';
import { MdcList } from '@angular-mdc/web';
import { ChatDeleteComponent } from '../chat-delete/chat-delete.component';
import { ChatEditComponent } from '../chat-edit/chat-edit.component';
import { AUTH_SERVICE } from '../../shared/auth/auth-service.token';
import { IAuthService } from '../../shared/auth/iauth-service.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chats-list',
  templateUrl: 'chats-list.component.html',
  styleUrls: ['chats-list.component.scss']
})
export class ChatsListComponent extends BaseComponent implements OnInit {

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
      this.resetVariables();
      this.loadMessages().subscribe();
    }
  }

  public get groupId() {
    return this._groupId;
  }

  /**
   * The currently displayed messages
   */
  public messages: ChatMessage[];

  /**
   * The current user id
   */
  public currentUserId: string;

  /**
   * Determines if any chat message are still to be shown
   */
  public hasRemaining: boolean;

  private _groupId: string;

  /**
   * Determines the last shown date
   */
  private lastShownDate: Date;

  constructor(private chatService: ChatService, @Inject(AUTH_SERVICE) private authService: IAuthService, private cdr: ChangeDetectorRef) {
    super();
    this.messages = [];
    this.currentUserId = this.authService.getUser().id;
    this.lastShownDate = new Date();
  }

  public ngOnInit(): void {
    this.subscription = this.chatService.onMessageSent.subscribe((sentMessage: ChatMessage) => {
      this.messages.unshift(sentMessage);
    });

    this.subscription = this.chatService.onMessageEdited.subscribe((editedMessage: ChatMessage) => {
      const messageIndex = this.messages.findIndex(x => x.id === editedMessage.id);

      if (messageIndex >= 0) {
        this.messages[messageIndex] = editedMessage;
      }
    });

    this.subscription = this.chatService.onMessageDeleted.subscribe((deletedId: string) => {
      const messageIndex = this.messages.findIndex(x => x.id === deletedId);

      if (messageIndex >= 0) {
        this.messages.splice(messageIndex, 1);
      }
    });
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
   * Gets the observable to use to refresh messages
   */
  public getRefreshObservable() {
    return this.loadMessages();
  }

  /**
   * Resets the variables, only called if group id is changed
   */
  private resetVariables() {
    this.hasRemaining = true;
    this.lastShownDate = new Date();
    this.messages = [];

    this.cdr.detectChanges();
  }

  /**
   * Loads the messages
   */
  private loadMessages() {
    if (!this.hasRemaining) {
      return Observable.empty();
    }

    return this.chatService.getAll(this._groupId, this.lastShownDate).do((messages) => {
      this.messages.push(...messages);

      if (messages.length === 0) {
        // No remaining anymore
        this.hasRemaining = false;
      }

      const dates = messages.map(m => new Date(m.sentAt));
      const earliest = new Date(Math.min.apply(null, dates));

      if (!isNaN(earliest.getTime())) {
        this.lastShownDate = earliest;
      }

      setTimeout(() => {
        if (this.mdcList) {
          this.mdcList.ngAfterContentInit();
        }
      }, 100);
    });
  }
}
