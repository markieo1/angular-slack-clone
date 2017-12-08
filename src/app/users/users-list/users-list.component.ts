import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html'
})
export class UsersListComponent extends BaseComponent implements OnInit {

  public users: User[];

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}
