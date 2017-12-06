import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../shared/basecomponent.class';
import { MdcMenu } from '@angular-mdc/web';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html'
})
export class UsersListComponent extends BaseComponent {

  @ViewChild('menu')
  menu: MdcMenu;


  public openMenu() {
    this.menu.open();
  }
}
