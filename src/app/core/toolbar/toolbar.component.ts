import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { DrawerService } from '../drawer/drawer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
  constructor(public media: ObservableMedia, private drawerService: DrawerService) {
  }

  /**
   * Called when the user clicks the menu button
   */
  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }
}
