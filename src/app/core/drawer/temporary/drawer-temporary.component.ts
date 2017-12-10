import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MdcTemporaryDrawer } from '@angular-mdc/web';
import { DrawerService } from '../drawer.service';
import { BaseComponent } from '../../../shared/base/basecomponent.class';
import { AUTH_SERVICE } from '../../../shared/auth/auth-service.token';
import { IAuthService } from '../../../shared/auth/iauth-service.interface';

@Component({
  selector: 'app-drawer-temporary',
  templateUrl: 'drawer-temporary.component.html'
})
export class DrawerTemporaryComponent extends BaseComponent implements OnInit {
  @ViewChild('drawer')
  drawer: MdcTemporaryDrawer;

  constructor(private drawerService: DrawerService, @Inject(AUTH_SERVICE) private authService: IAuthService) {
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
