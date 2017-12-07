import { Component, OnInit, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { MdcList } from '@angular-mdc/web';

@Component({
  selector: 'app-groups-list',
  templateUrl: 'groups-list.component.html'
})
export class GroupsListComponent extends BaseComponent implements OnInit {

  /**
   * The available groups
   */
  public groups: Group[];

  @ViewChild(MdcList)
  public mdcList: MdcList;

  constructor(private groupService: GroupService, private cdr: ChangeDetectorRef, private zone: NgZone) {
    super();
    this.groups = [];
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;

      if (this.mdcList) {
        setTimeout(() => {
          this.mdcList.ngAfterContentInit();
        }, 100);
      }
    });
  }
}
