import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Location } from '@angular/common';
import { GroupService } from '../../groups/group.service';
import { ToolbarService } from '../../core/toolbar/toolbar.service';
import { ToolbarItem } from '../../core/toolbar/toolbar-item.class';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html'
})
export class GroupEditComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(private location: Location, private groupService: GroupService, private toolbarService: ToolbarService) {
    super();
  }

  ngOnInit(): void {
    const toolbarButtonDiscard: ToolbarItem = {
      title: 'Discard changes',
      icon: 'cancel',
      onClick: () => {
        this.discardChanges();
      }
    };

    this.toolbarService.setToolbarItems([toolbarButtonDiscard]);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.toolbarService.resetItems();
  }

  /**
   * Saves the changes
   */
  public saveChanges(): void {
    console.log('TODO save changes!');
  }

  /**
   * Discards the made changes
   */
  private discardChanges(): void {
    this.location.back();
  }
}
