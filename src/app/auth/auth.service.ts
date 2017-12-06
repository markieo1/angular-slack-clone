import { User } from '../shared/user.model';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private http: Http) {
  }

  /**
   * Logs the user in with the API
   * @param user The user to login
   */
  public login(user: User): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users/login`, user, this.getRequestOptions())
      .map(r => r.json())
      .map(body => {
        // login successful if there's a jwt token in the response
        const { token } = body;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token);

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  /**
   * Logs the user out
   */
  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
  }

  private getRequestOptions(): RequestOptionsArgs {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return {
      headers: headers
    };
  }

  /**
   * Determines if the user is already logged in
   */
  public loggedIn() {
    return tokenNotExpired();
  }
}
