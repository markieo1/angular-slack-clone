import { EventEmitter } from '@angular/core';

export class DrawerService {

  public onToggleDrawer: EventEmitter<void>;

  constructor() {
    this.onToggleDrawer = new EventEmitter();
  }

  /**
   * Toggles the drawer
   */
  public toggleDrawer(): void {
    this.onToggleDrawer.emit();
  }
}
