import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../shared/user.model';
import { UserService } from '../user.service';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { ToolbarItem } from '../../core/toolbar/toolbar-item.class';
import { UserDeleteComponent } from 'app/users/user-delete/user-delete.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent extends BaseComponent implements OnInit, OnDestroy {

  /**
   * The delete dialog component
   */
  @ViewChild(UserDeleteComponent)
  public deleteDialog: UserDeleteComponent;

  public user: User;
  private id: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private toolbarService: ToolbarService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.loadUser();
      });

    const toolbarButtonEdit: ToolbarItem = {
      title: 'Edit this user',
      icon: 'edit',
      onClick: () => {
        this.editUser();
      }
    };

    const toolbarButtonDiscard: ToolbarItem = {
      title: 'Delete this user',
      icon: 'delete_forever',
      onClick: () => {
        this.deleteUser();
      }
    };

    this.toolbarService.setToolbarItems([toolbarButtonEdit, toolbarButtonDiscard]);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.toolbarService.reset();
  }

  /**
   * Loads the user
   */
  private loadUser() {
    this.subscription = this.userService.get(this.id).subscribe((user) => {
      this.user = user;

      this.toolbarService.setTitle(this.user.nickname);
    }, (error) => {
      console.error('User was not found!', error);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  /**
   * Edits a user
   */
  private editUser(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  /**
   * Deletes a user
   */
  private deleteUser(): void {
    this.deleteDialog.showDialog();
  }
}
