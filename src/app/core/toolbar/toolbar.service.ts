import { ToolbarItem } from './toolbar-item.class';
import { EventEmitter } from '@angular/core';

export class ToolbarService {

  /**
   * The event emitter for toolbar items
   */
  private onToolbarItemsChanged: EventEmitter<Array<ToolbarItem>>;

  /**
   * The current toolbar items
   */
  private toolbarItems: Array<ToolbarItem>;

  /**
   * Constructor
   */
  constructor() {
    this.onToolbarItemsChanged = new EventEmitter();
    this.toolbarItems = [];
  }

  /**
   * Sets the toolbar items
   * @param toolbarItems The items to display in the toolbar
   */
  public setToolbarItems(toolbarItems: ToolbarItem[]) {
    this.toolbarItems = toolbarItems;
    this.onToolbarItemsChanged.emit(this.toolbarItems);
  }

  /**
   * Gets the toolbar items observable
   */
  public getToolbarItems() {
    return this.onToolbarItemsChanged;
  }

  /**
   * Resets the toolbar items
   */
  public resetItems() {
    this.setToolbarItems([]);
  }
}
