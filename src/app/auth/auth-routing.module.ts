import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from 'app/auth/login-guard.service';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard], data: { showMinimalLayout: true } },
  // { path: 'register', component },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
