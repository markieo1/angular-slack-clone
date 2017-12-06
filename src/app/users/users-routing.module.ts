import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/users/login/login.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          showMinimalLayout: true
        }
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
