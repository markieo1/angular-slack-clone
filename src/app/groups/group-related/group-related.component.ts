import { Component, ViewChild, Input } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { GroupService } from '../../groups/group.service';
import { MdcDialogComponent, MdcList } from '@angular-mdc/web';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/groups/group.model';

@Component({
  selector: 'app-group-related',
  templateUrl: 'group-related.component.html',
  styleUrls: ['group-related.component.scss']
})
export class GroupRelatedComponent extends BaseComponent {
  /**
   * The related dialog component
   */
  @ViewChild(MdcDialogComponent)
  public relatedDialog: MdcDialogComponent;

  /**
   * The list displaying the data
   */
  @ViewChild(MdcList)
  public mdcList: MdcList;

  /**
   * The id of the group for which to show related groups
   */
  @Input()
  public id: string;

  /**
   * Determines if a load is in progress
   */
  public loadInProgress: boolean;

  /**
   * The related groups for the group id
   */
  public relatedGroups: Group[];

  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router) {
    super();
    this.relatedGroups = [];
  }

  /**
   * Shows the related dialog
   */
  public showDialog(): void {
    this.loadRelatedGroups();

    this.relatedDialog.show();
  }

  /**
   * Closes the related dialog
   */
  public closeDialog(): void {
    this.relatedDialog.close();
  }

  /**
   * Loads the related groups
   */
  private loadRelatedGroups(): void {
    if (!this.id) {
      return;
    }

    this.loadInProgress = true;

    this.groupService.getRelated(this.id).subscribe((relatedGroups) => {
      this.loadInProgress = false;
      this.relatedGroups = relatedGroups;

      setTimeout(() => {
        if (this.mdcList) {
          this.mdcList.ngAfterContentInit();
        }
      }, 100);
    }, (error) => {
      console.error('Error loading related groups', error);
      this.loadInProgress = false;
    });
  }
}
