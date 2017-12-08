import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { UserService } from '../user.service';
import { User } from '../../shared/user.model';
import { MdcList } from '@angular-mdc/web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent extends BaseComponent implements OnInit {

  /**
   * The available users
   */
  public users: User[];

  @ViewChild(MdcList)
  public mdcList: MdcList;

  constructor(private userService: UserService, private router: Router) {
    super();
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;

      setTimeout(() => {
        if (this.mdcList) {
          this.mdcList.ngAfterContentInit();
        }
      }, 100);
    });
  }

  /**
   * Creates a new user
   */
  public createNewUser(): void {
    this.router.navigate(['users', 'new']);
  }
}
