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

    const toolbarButton: ToolbarItem = {
      title: 'Edit this group',
      icon: 'edit',
      onClick: () => {
        this.router.navigate(['edit'], { relativeTo: this.route });
      }
    };

    this.toolbarService.setToolbarItems([toolbarButton]);
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
}
