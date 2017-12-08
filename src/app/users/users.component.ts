import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../shared/base/basecomponent.class';
import { Router, NavigationEnd } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { ToolbarService } from '../core/toolbar/toolbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent extends BaseComponent implements OnInit, OnDestroy {
  /**
   * Determines if we are currently displaying any detail
   */
  public isDisplayingDetail: boolean;

  constructor(private router: Router, private media: ObservableMedia, private toolbarService: ToolbarService) {
    super();

    const segments = this.router.url.split('/').filter(i => i);
    this.isDisplayingDetail = segments.length > 1;
    this.updateToolbar();
  }

  ngOnInit(): void {
    this.subscription = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map((event: NavigationEnd) => event.url)
      .map((url) => url.split('/'))
      .map((segments) => segments.filter(i => i))
      .subscribe((segments) => {
        this.isDisplayingDetail = segments.length > 1;
        this.updateToolbar();
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.toolbarService.reset();
  }

  /**
   * Updates the toolbar
   */
  private updateToolbar() {
    if (!this.isDisplayingDetail) {
      this.toolbarService.setTitle('Users');
    }
  }
}
