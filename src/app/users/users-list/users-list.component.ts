import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { GroupService } from 'app/groups/group.service';
import { Group } from 'app/groups/group.model';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html'
})
export class UsersListComponent extends BaseComponent implements OnInit {

  public groups: Group[];

  constructor(private groupService: GroupService) {
    super();
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

}
