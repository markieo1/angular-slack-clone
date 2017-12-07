import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { GroupStartComponent } from './group-start/group-start.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupsComponent } from './groups.component';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GroupStartComponent
      },
      {
        path: 'new',
        component: GroupEditComponent
      },
      {
        path: ':id',
        component: GroupDetailComponent
      },
      {
        path: ':id/edit',
        component: GroupEditComponent
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
export class GroupsRoutingModule { }
