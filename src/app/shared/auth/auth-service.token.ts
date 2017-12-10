import { InjectionToken } from '@angular/core';
import { IAuthService } from './iauth-service.interface';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('auth.service');
