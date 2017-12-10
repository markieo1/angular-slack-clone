import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../shared/layout/layout.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth-guard.service';
import { LoginGuard } from './login-guard.service';
import { RegisterComponent } from './register/register.component';
import { AUTH_SERVICE } from '../shared/auth/auth-service.token';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    },
    AuthGuard,
    LoginGuard,
  ]
})
export class AuthModule { }
