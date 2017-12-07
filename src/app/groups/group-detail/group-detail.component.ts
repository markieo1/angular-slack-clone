import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { ToolbarItem } from '../../core/toolbar/toolbar-item.class';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent extends BaseComponent implements OnInit, OnDestroy {
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

    this.toolbarService.setToolbarItems([toolbarButtonEdit, toolbarButtonDiscard]);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.toolbarService.resetItems();
  }

  /**
   * Loads the group
   */
  private loadGroup() {
    this.subscription = this.groupService.getGroup(this.id).subscribe((group) => {
      this.group = group;
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
    this.groupService.deleteGroup(this.id).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
