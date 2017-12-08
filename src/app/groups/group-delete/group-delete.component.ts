import { Component, ViewChild, Input } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { GroupService } from '../../groups/group.service';
import { MdcDialogComponent } from '@angular-mdc/web';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html'
})
export class GroupDeleteComponent extends BaseComponent {

  /**
   * The delete dialog component
   */
  @ViewChild(MdcDialogComponent)
  public deleteDialog: MdcDialogComponent;

  /**
   * The id of the group that should be deleted
   */
  @Input()
  public id: string;

  /**
   * Determines if a delete is in progress
   */
  public deleteInProgress: boolean;

  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  /**
   * Shows the delete dialog
   */
  public showDialog(): void {
    this.deleteDialog.show();
  }

  /**
   * Deletes the group
   */
  public deleteGroup(): void {
    this.deleteInProgress = true;

    this.groupService.deleteGroup(this.id).subscribe((deleted) => {
      this.deleteInProgress = false;
      this.deleteDialog.close();
      this.router.navigate(['../'], { relativeTo: this.route });
    }, (error) => {
      console.error(error);
      this.deleteInProgress = false;
    });
  }
}
