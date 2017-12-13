import { Directive, AfterViewInit, ElementRef, Input, EventEmitter, Output, HostListener, Renderer2, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

/**
 * Directive handling infinite scrolling up
 * Thanks to: https://hackernoon.com/naive-infinite-scroll-in-reactive-programming-using-rxjs-observables-4a605d3146e8
 */
@Directive({
  selector: '[appInfiniteScrollUp]'
})
export class InfiniteScrollUpDirective implements OnInit {

  /**
   * Determines the scroll percentage before the loadNewObservable is called
   */
  @Input()
  public scrollPercentage = 30;

  /**
   * The observable to call when new data needs to be loaded
   */
  @Input()
  public loadNewObservable: Observable<any>;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.registerScrollEvent();
  }

  private registerScrollEvent() {
    Observable.fromEventPattern((handler) => {
      this.renderer.listen(this.element.nativeElement, 'scroll', (event) => handler(event));
    })
      .map((e: any) => {
        return {
          scrollHeight: e.target.scrollHeight,
          currentScrollPosition: e.target.scrollTop,
          clientHeight: e.target.clientHeight
        };
      })
      .pairwise()
      .filter(scrollDetails => this.isScrollingUp(scrollDetails) && this.isScrollExpectedPercent(scrollDetails[1]))
      .exhaustMap(() => this.loadNewObservable)
      .subscribe();
  }

  /**
   * Determines if the user is scrolling up
   * @param scrollPositions The scroll positions, array of 2
   */
  private isScrollingUp(scrollPositions) {
    return scrollPositions[0].currentScrollPosition > scrollPositions[1].currentScrollPosition;
  }

  /**
   * Determines if the scroll is the expected percentage
   */
  private isScrollExpectedPercent(scrollInfo) {
    const maxScrollHeight = scrollInfo.clientHeight;

    const scrolled = scrollInfo.currentScrollPosition;
    return scrolled < maxScrollHeight * (this.scrollPercentage / 100);
  }
}
