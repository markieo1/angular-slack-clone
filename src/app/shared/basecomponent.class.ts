import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class BaseComponent implements OnDestroy {
  /**
   * Adds a subscription to the array of all the subscriptions
   */
  public set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  /**
   * All the subscriptions
   */
  private subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
