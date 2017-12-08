import { Component, ViewChild, Input } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { UserService } from '../../users/user.service';
import { MdcDialogComponent } from '@angular-mdc/web';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html'
})
export class UserDeleteComponent extends BaseComponent {

  /**
   * The delete dialog component
   */
  @ViewChild(MdcDialogComponent)
  public deleteDialog: MdcDialogComponent;

  /**
   * The id of the user that should be deleted
   */
  @Input()
  public id: string;

  /**
   * Determines if a delete is in progress
   */
  public deleteInProgress: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  /**
   * Shows the delete dialog
   */
  public showDialog(): void {
    this.deleteDialog.show();
  }

  /**
   * Deletes the user
   */
  public deleteUser(): void {
    this.deleteInProgress = true;

    this.userService.delete(this.id).subscribe((deleted) => {
      this.deleteInProgress = false;
      this.deleteDialog.close();
      this.router.navigate(['../'], { relativeTo: this.route });
    }, (error) => {
      console.error(error);
      this.deleteInProgress = false;
    });
  }
}
