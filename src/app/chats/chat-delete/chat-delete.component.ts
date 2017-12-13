import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { MdcDialogComponent } from '@angular-mdc/web';
import { ChatService } from 'app/chats/chat.service';

@Component({
  selector: 'app-chat-delete',
  templateUrl: './chat-delete.component.html'
})
export class ChatDeleteComponent extends BaseComponent {

  /**
   * The delete dialog component
   */
  @ViewChild(MdcDialogComponent)
  public deleteDialog: MdcDialogComponent;

  @Input()
  public groupId: string;

  /**
   * The id of the chat that should be deleted
   */
  public chatId: string;

  /**
   * Determines if a delete is in progress
   */
  public deleteInProgress: boolean;

  constructor(private chatService: ChatService) {
    super();
  }

  /**
   * Shows the delete dialog
   */
  public showDialog(chatId: string): void {
    this.chatId = chatId;
    this.deleteDialog.show();
  }

  /**
   * Deletes the chat
   */
  public deleteChat(): void {
    this.deleteInProgress = true;

    this.chatService.delete(this.groupId, this.chatId).subscribe((deleted) => {
      this.deleteInProgress = false;
      this.deleteDialog.close();
    }, (error) => {
      console.error(error);
      this.deleteInProgress = false;
    });
  }
}
