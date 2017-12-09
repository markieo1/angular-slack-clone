import { BaseModel } from '../shared/base/basemodel.class';

export class ChatMessage extends BaseModel {
  /**
   * The message that is sent
   */
  message: string;

  /**
   * The sent date
   */
  sentAt: Date;

  /**
   * The last edited date
   */
  lastEdit: Date;

  /**
   * From whoem the message is
   */
  from: {
    /**
     * The nickname of the user
     */
    nickname: string;

    /**
     * The id of the user
     */
    id: string;
  };

  /**
   * The group id for this message
   */
  groupId: string;

  constructor(id?: string) {
    super(id);
    this.sentAt = new Date();
    this.lastEdit = new Date();
  }
}
