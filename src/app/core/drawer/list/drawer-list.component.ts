import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-list',
  templateUrl: 'drawer-list.component.html'
})
export class DrawerListComponent {
  navLinks = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
      desc: 'An overview of what you can do in this application'
    },
    {
      name: 'Groups',
      route: '/groups',
      icon: 'group',
      desc: 'An overview of all the groups you can join and chat in'
    },
    {
      name: 'Users',
      route: '/users',
      icon: 'person',
      desc: 'An overview of all the users in this application'
    }
  ];
}
