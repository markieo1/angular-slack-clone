import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { GroupService } from '../group.service';
import { Group } from '../group.model';

@Component({
  selector: 'app-groups-list',
  templateUrl: 'groups-list.component.html'
})
export class GroupsListComponent extends BaseComponent implements OnInit {

  /**
   * The available groups
   */
  public groups: Group[];

  constructor(private groupService: GroupService) {
    super();
    this.groups = [];
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

}
