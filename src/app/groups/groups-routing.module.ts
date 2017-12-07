import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupsListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
