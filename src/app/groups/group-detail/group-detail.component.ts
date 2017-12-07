import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent extends BaseComponent implements OnInit {
  public group: Group;
  private id: string;

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.loadGroup();
      });
  }

  /**
   * Loads the group
   */
  private loadGroup() {
    this.groupService.getGroup(this.id).subscribe((group) => {
      this.group = group;
    });
  }
}
