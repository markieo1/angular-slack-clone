import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AUTH_SERVICE } from '../shared/auth/auth-service.token';
import { IAuthService } from '../shared/auth/iauth-service.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( @Inject(AUTH_SERVICE) private authService: IAuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/', 'login']);
      return false;
    }
  }
}
