import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { DrawerService } from '../drawer/drawer.service';
import { ToolbarService } from './toolbar.service';
import { BaseComponent } from '../../shared/basecomponent.class';
import { ToolbarItem } from './toolbar-item.class';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent extends BaseComponent implements OnInit {
  public toolbarItems: ToolbarItem[];
  public title: string;

  constructor(public media: ObservableMedia, private drawerService: DrawerService, private toolbarService: ToolbarService, private cdr: ChangeDetectorRef,
    private authService: AuthService) {
    super();
    this.toolbarItems = [];
  }

  ngOnInit(): void {
    this.subscription = this.toolbarService.getToolbarItems().subscribe((items: ToolbarItem[]) => {
      this.toolbarItems.splice(0, this.toolbarItems.length);
      this.toolbarItems.push(...items);
      this.cdr.detectChanges();
    });

    this.subscription = this.toolbarService.getTitleChanged().subscribe((newTitle: string) => {
      this.title = newTitle;
    });
  }

  /**
   * Called when the user clicks the menu button
   */
  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  /**
   * Logout the user
   */
  public logout(): void {
    this.authService.logout();
  }
}
