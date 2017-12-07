import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { DrawerService } from '../drawer/drawer.service';
import { ToolbarService } from './toolbar.service';
import { BaseComponent } from '../../shared/basecomponent.class';
import { ToolbarItem } from './toolbar-item.class';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent extends BaseComponent implements OnInit {
  public toolbarItems: ToolbarItem[];

  constructor(public media: ObservableMedia, private drawerService: DrawerService, private toolbarService: ToolbarService, private cdr: ChangeDetectorRef) {
    super();
    this.toolbarItems = [];
  }

  ngOnInit(): void {
    this.subscription = this.toolbarService.getToolbarItems().subscribe((items) => {
      this.toolbarItems.splice(0, this.toolbarItems.length);
      this.toolbarItems.push(...items);
      this.cdr.detectChanges();
    });
  }

  /**
   * Called when the user clicks the menu button
   */
  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }
}
