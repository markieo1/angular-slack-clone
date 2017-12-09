import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../shared/user.model';
import { BaseCrudService } from '../shared/base/basecrudservice.class';
import { ChatMessage } from './chat.model';

@Injectable()
export class ChatService extends BaseCrudService<ChatMessage> {
  public groupId: string;

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  }

  protected getResourceUrl(): string {
    return `groups/${this.groupId}/messages`;
  }
}
