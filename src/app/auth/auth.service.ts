import { User } from '../shared/user.model';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { IAuthService } from '../shared/auth/iauth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  private user: User;
  private jwtHelper: JwtHelper;

  constructor(private http: Http, private router: Router) {
    this.jwtHelper = new JwtHelper();
  }

  /**
   * Logs the user in with the API
   * @param user The user to login
   */
  public login(user: User): Observable<boolean> {
    if (this.isLoggedIn()) {
      return Observable.of(true);
    }

    return this.http.post(`${environment.apiUrl}/users/login`, user, this.getRequestOptions())
      .map(r => r.json())
      .map(body => {
        // login successful if there's a jwt token in the response
        const { token } = body;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token);

          this.parseToken();

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  /**
   * Registers the user in with the API
   * @param user The user to register
   */
  public register(user: User): Observable<boolean> {
    if (this.isLoggedIn()) {
      return Observable.of(true);
    }

    return this.http.post(`${environment.apiUrl}/users/register`, user, this.getRequestOptions())
      .map(r => r.json())
      .map(body => {
        // register successful if there's a jwt token in the response
        const { token } = body;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token);

          this.parseToken();

          // return true to indicate successful register
          return true;
        } else {
          // return false to indicate failed register
          return false;
        }
      });
  }


  /**
   * Logs the user out
   */
  public logout(): void {
    // clear token remove user from local storage to log user out
    this.user = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Determines if the user is already logged in
   */
  public isLoggedIn() {
    return tokenNotExpired();
  }

  /**
   * Gets the currently logged in user, returns null if not logged in
   */
  public getUser(): User {
    if (!this.user && this.isLoggedIn()) {
      // Logged in but not loaded,
      this.parseToken();
    }

    return this.user;
  }

  /**
   * Parses the JWT token
   */
  private parseToken() {
    const token = localStorage.getItem('token');
    const parsedToken = this.jwtHelper.decodeToken(token);

    const user: User = {
      email: parsedToken.email,
      nickname: parsedToken.nickname,
      id: parsedToken.id
    };

    this.user = user;
  }

  private getRequestOptions(): RequestOptionsArgs {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return {
      headers: headers
    };
  }
}
