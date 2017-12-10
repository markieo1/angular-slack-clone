import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { DrawerService } from '../drawer/drawer.service';
import { ToolbarService } from './toolbar.service';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { ToolbarItem } from './toolbar-item.class';
import { AUTH_SERVICE } from '../../shared/auth/auth-service.token';
import { IAuthService } from '../../shared/auth/iauth-service.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent extends BaseComponent implements OnInit {
  public toolbarItems: ToolbarItem[];
  public title: string;

  constructor(public media: ObservableMedia, private drawerService: DrawerService, private toolbarService: ToolbarService, private cdr: ChangeDetectorRef,
    @Inject(AUTH_SERVICE) private authService: IAuthService) {
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
