import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class ChatsListComponent extends BaseComponent implements OnInit {
  @ViewChild(MdcList)
  public mdcList: MdcList;

  /**
   * The group id to display the chats for
   */
  @Input()
  public set groupId(groupId) {
    this._groupId = groupId;

    if (groupId) {
      this.chatService.groupId = groupId;
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

  ngOnInit(): void {
    this.chatService.getOnChangeEvent().subscribe(() => this.loadMessages());
  }

  /**
   * Loads the messages
   */
  private loadMessages() {
    this.chatService.getAll().subscribe((messages) => {
      this.messages = messages;

      setTimeout(() => {
        if (this.mdcList) {
          this.mdcList.ngAfterContentInit();
        }
      }, 100);
    });
  }
}
