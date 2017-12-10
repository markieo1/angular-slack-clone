import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { ChatMessage } from './chat.model';

@Injectable()
export class ChatService {

  constructor(private authHttp: AuthHttp) {
  }

  /**
   * Gets all the messages for the specified group
   * @param groupId The group id
   */
  public getAll(groupId: string): Observable<Array<ChatMessage>> {
    return this.authHttp.get(`${environment.apiUrl}/groups/${groupId}/messages`)
      .map(r => r.json());
  }

  /**
   * Gets a single message
   * @param groupId The group id
   * @param id The message id
   */
  public get(groupId: string, id: string): Observable<ChatMessage> {
    return this.authHttp.get(`${environment.apiUrl}/groups/${groupId}/messages`)
      .map(r => r.json());
  }

  /**
   * Deletes a message from a group
   * @param groupId The group id
   * @param id The message id
   */
  public delete(groupId: string, id: string): Observable<boolean> {
    return this.authHttp.delete(`${environment.apiUrl}/groups/${groupId}/messages/${id}`)
      .map(response => response.status === 204);
  }

  /**
   * Creates a new message in a group
   * @param groupId The group id
   * @param chatMessage The message to create
   */
  public create(groupId: string, chatMessage: ChatMessage): Observable<ChatMessage> {
    return this.authHttp.post(`${environment.apiUrl}/groups/${groupId}/messages`, chatMessage)
      .map(response => response.json());
  }

  /**
   * Updates a message in a group
   * @param groupId The group id
   * @param id The message id
   * @param chatMessage The updated message
   */
  public update(groupId: string, id: string, chatMessage: ChatMessage): Observable<ChatMessage> {
    return this.authHttp.put(`${environment.apiUrl}/groups/${groupId}/messages/${id}`, chatMessage)
      .map(response => response.json());
  }
}
