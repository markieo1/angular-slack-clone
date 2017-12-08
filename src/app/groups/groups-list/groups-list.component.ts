import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { MdcList } from '@angular-mdc/web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  templateUrl: 'groups-list.component.html',
  styleUrls: ['groups-list.component.scss']
})
export class GroupsListComponent extends BaseComponent implements OnInit {

  /**
   * The available groups
   */
  public groups: Group[];

  @ViewChild(MdcList)
  public mdcList: MdcList;

  constructor(private groupService: GroupService, private router: Router) {
    super();
    this.groups = [];
  }

  ngOnInit(): void {
    this.getGroups();
  }

  /**
   * Creates a new group
   */
  public createNewGroup(): void {
    this.router.navigate(['groups', 'new']);
  }

  /**
   * Gets the groups
   */
  private getGroups() {
    const subscription = (groups) => {
      this.groups = groups;

      setTimeout(() => {
        if (this.mdcList) {
          this.mdcList.ngAfterContentInit();
        }
      }, 100);
    };

    this.subscription = this.groupService.getAll().subscribe(subscription);

    this.subscription = this.groupService.getOnChangeEvent().subscribe(() => {
      this.subscription = this.groupService.getAll().subscribe(subscription);
    });
  }
}
