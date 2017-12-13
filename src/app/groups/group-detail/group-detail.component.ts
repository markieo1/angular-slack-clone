import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { ToolbarItem } from '../../core/toolbar/toolbar-item.class';
import { GroupDeleteComponent } from '../group-delete/group-delete.component';
import { ChatsListComponent } from '../../chats/chats-list/chats-list.component';
import { GroupRelatedComponent } from '../group-related/group-related.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['group-detail.component.scss']
})
export class GroupDetailComponent extends BaseComponent implements OnInit, OnDestroy {

  /**
   * The delete dialog component
   */
  @ViewChild(GroupDeleteComponent)
  public deleteDialog: GroupDeleteComponent;

  @ViewChild(ChatsListComponent)
  public chatListComponent: ChatsListComponent;

  @ViewChild(GroupRelatedComponent)
  public groupRelatedComponent: GroupRelatedComponent;

  public group: Group;
  private id: string;

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private toolbarService: ToolbarService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.loadGroup();
      });

    const toolbarButtonEdit: ToolbarItem = {
      title: 'Edit this group',
      icon: 'edit',
      onClick: () => {
        this.editGroup();
      }
    };

    const toolbarButtonDiscard: ToolbarItem = {
      title: 'Delete this group',
      icon: 'delete_forever',
      onClick: () => {
        this.deleteGroup();
      }
    };

    const toolbarButtonRelated: ToolbarItem = {
      title: 'View related groups',
      icon: 'gesture',
      onClick: () => {
        this.showRelatedGroups();
      }
    };

    this.toolbarService.setToolbarItems([toolbarButtonRelated, toolbarButtonEdit, toolbarButtonDiscard]);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.toolbarService.reset();
  }

  /**
   * Gets the observable which is used to check if the items have been refreshed
   */
  public getRefreshObservable() {
    return this.chatListComponent.getRefreshObservable();
  }

  /**
   * Loads the group
   */
  private loadGroup() {
    this.subscription = this.groupService.get(this.id).subscribe((group) => {
      this.group = group;

      this.toolbarService.setTitle(this.group.name);
    }, (error) => {
      console.error('Group was not found!', error);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  /**
   * Edits a group
   */
  private editGroup(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  /**
   * Deletes a group
   */
  private deleteGroup(): void {
    this.deleteDialog.showDialog();
  }

  /**
   * Shows the related groups
   */
  private showRelatedGroups(): void {
    this.groupRelatedComponent.showDialog();
  }
}
