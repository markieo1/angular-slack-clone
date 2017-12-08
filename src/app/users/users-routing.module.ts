import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { UsersComponent } from './users.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserStartComponent
      },
      {
        path: 'new',
        component: UserEditComponent
      },
      {
        path: ':id',
        component: UserDetailComponent
      },
      {
        path: ':id/edit',
        component: UserEditComponent
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
