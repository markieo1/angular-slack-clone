import { Component, ViewChild, OnInit } from '@angular/core';
import { MdcTemporaryDrawer } from '@angular-mdc/web';
import { DrawerService } from '../drawer.service';
import { BaseComponent } from '../../../shared/basecomponent.class';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-drawer-temporary',
  templateUrl: 'drawer-temporary.component.html'
})
export class DrawerTemporaryComponent extends BaseComponent implements OnInit {
  @ViewChild('drawer')
  drawer: MdcTemporaryDrawer;

  constructor(private drawerService: DrawerService, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.drawerService.onToggleDrawer.subscribe(() => {
      this.toggleDrawer();
    });
  }

  /**
   * Opens or closes the drawer
   */
  toggleDrawer() {
    this.drawer.open();
  }

  /**
   * Logs the user out
   */
  public logout(): void {
    this.authService.logout();
  }
}
