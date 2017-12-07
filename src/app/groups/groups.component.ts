import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/basecomponent.class';
import { Router, NavigationEnd } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent extends BaseComponent implements OnInit {
  /**
   * Determines if we are currently displaying any detail
   */
  public isDisplayingDetail: boolean;

  constructor(private router: Router, private media: ObservableMedia) {
    super();

    const segments = this.router.url.split('/').filter(i => i);
    this.isDisplayingDetail = segments.length > 1;
  }

  ngOnInit(): void {
    this.subscription = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.url)
      .map((url) => url.split('/'))
      .map((segments) => segments.filter(i => i))
      .subscribe((segments) => {
        this.isDisplayingDetail = segments.length > 1;
      });
  }

  public canShowList(): boolean {

    if (this.media.isActive('gt-sm')) {
      // Is in desktop
      return true;
    } else {
      return !this.isDisplayingDetail;
    }
  }
}
