import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return false;
    } else {
      this.location.back();
      return true;
    }
  }
}
