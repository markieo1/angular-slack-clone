import { BaseModel } from '../shared/base/basemodel.class';

/**
 * Model representing an group
 */
export class Group extends BaseModel {
  /**
   * The name of the group
   */
  public name: string;

  /**
   * The creation date of the group
   */
  createdAt: Date;

  /**
   * The last update date of the group
   */
  updatedAt: Date;

  /**
   * The reference to the messages send in the group
   */
  messages: string[];

  /**
   * The tags for this group
   */
  tags: string[];

  constructor() {
    super();
  }
}
