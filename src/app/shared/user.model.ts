import { BaseModel } from '../shared/base/basemodel.class';

/**
 * Model representing an user
 */
export class User extends BaseModel {
  /**
   * The email of the user
   */
  public email: string;

  /**
   * The password of the user, will only be sent never received!
   */
  public password?: string;

  /**
   * The nickname of the user
   */
  public nickname: string;

  constructor() {
    super();
  }
}
