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

  private onTitleChanged: EventEmitter<string>;

  /**
   * Constructor
   */
  constructor() {
    this.onToolbarItemsChanged = new EventEmitter();
    this.onTitleChanged = new EventEmitter();
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

  /**
   * Resets the toolbar title
   */
  public resetTitle() {
    this.setTitle('');
  }

  /**
   * Resets the changed toolbar
   */
  public reset() {
    this.resetItems();
    this.resetTitle();
  }

  /**
   * Gets the title observable
   */
  public getTitleChanged(): EventEmitter<string> {
    return this.onTitleChanged;
  }

  /**
   * Sets the title in the toolbar
   * @param title The title to display at the toolbar
   */
  public setTitle(title: string) {
    this.onTitleChanged.emit(title);
  }
}
