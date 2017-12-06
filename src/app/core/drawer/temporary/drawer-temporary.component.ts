import { Component, ViewChild, OnInit } from '@angular/core';
import { MdcTemporaryDrawer } from '@angular-mdc/web';
import { DrawerService } from '../drawer.service';
import { BaseComponent } from '../../../shared/basecomponent.class';

@Component({
  selector: 'app-drawer-temporary',
  templateUrl: 'drawer-temporary.component.html'
})
export class DrawerTemporaryComponent extends BaseComponent implements OnInit {
  @ViewChild('drawer')
  drawer: MdcTemporaryDrawer;

  constructor(private drawerService: DrawerService) {
    super()
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
}
