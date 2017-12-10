import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AUTH_SERVICE } from '../shared/auth/auth-service.token';
import { IAuthService } from '../shared/auth/iauth-service.interface';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) { }

  canActivate() {
    return !this.authService.isLoggedIn();
  }
}
