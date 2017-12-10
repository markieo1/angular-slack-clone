import { User } from '../user.model';
import { Observable } from 'rxjs/Observable';

/**
 * Interface defining each auth service
 */
export interface IAuthService {
  /**
   * Logs the user in
   * @param user The user to login
   */
  login(user: User): Observable<boolean>;

  /**
   * Registers the user in
   * @param user The user to register
   */
  register(user: User): Observable<boolean>;

  /**
   * Logs the user out
   */
  logout(): void;

  /**
   * Determines if the user is already logged in
   */
  isLoggedIn(): boolean;

  /**
   * Gets the currently logged in user
   */
  getUser(): User;
}
