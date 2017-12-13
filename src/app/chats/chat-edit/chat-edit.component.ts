import { Component, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { MdcDialogComponent } from '@angular-mdc/web';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../chat.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-edit',
  templateUrl: './chat-edit.component.html'
})
export class ChatEditComponent extends BaseComponent implements OnInit {

  /**
   * The edit dialog component
   */
  @ViewChild(MdcDialogComponent)
  public editDialog: MdcDialogComponent;

  @Input()
  public groupId: string;

  /**
   * The chat message that should be edited
   */
  public chatMessage: ChatMessage;

  /**
   * The message form
   */
  public messageForm: FormGroup;

  /**
   * Determines if a edit is in progress
   */
  public editInProgress: boolean;

  constructor(private chatService: ChatService) {
    super();

    this.chatMessage = new ChatMessage();
  }

  public ngOnInit() {
    this.initForm();
  }

  /**
   * Shows the edit dialog
   */
  public showDialog(chatMessage: ChatMessage): void {
    this.chatMessage = chatMessage;
    this.messageForm.setValue({
      message: chatMessage.message
    });
    this.editDialog.show();
  }

  /**
   * Saves the changes
   */
  public onSubmit(): void {
    this.editInProgress = true;

    if (!this.messageForm.valid) {
      this.editInProgress = false;
      return;
    }

    this.subscription = this.chatService.update(this.groupId, this.chatMessage.id, this.chatMessage).subscribe((edited) => {
      this.editInProgress = false;
      this.editDialog.close();
    }, (error) => {
      console.error(error);
      this.editInProgress = false;
    });
  }

  private initForm() {
    this.messageForm = new FormGroup({
      message: new FormControl(this.chatMessage.message, Validators.required)
    });
  }
}
