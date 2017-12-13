import { Directive, Input, DoCheck, ElementRef, AfterViewChecked, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appScrollDown]'
})
export class ScrollDownDirective implements DoCheck, AfterViewChecked {

  /**
   * The input to check for changes
   */
  @Input()
  public elements: any[];

  /**
   * Determines if the element should scroll down when the array changes
   */
  @Input()
  public scrollOnChange = true;

  /**
   * Determines if the element should scroll down on first load
   */
  @Input()
  public set scrollOnLoad(scrollOnLoad: boolean) {
    this._scrollOnLoad = scrollOnLoad;
    this.lastLength = 0;
    this.hadFirstLoad = false;
  }

  public get scrollOnLoad() {
    return this._scrollOnLoad;
  }

  /**
   * Determines if the element should scroll
   */
  private shouldScroll = false;

  /**
   * The last length of the array
   */
  private lastLength = 0;

  private _scrollOnLoad = true;

  private hadFirstLoad = false;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

  ngDoCheck(): void {
    if (this.elements) {
      // check for first load
      if (!this.hadFirstLoad && this.elements.length > 0 && this.lastLength === 0) {
        // First load happened
        this.hadFirstLoad = true;

        if (this.scrollOnLoad) {
          this.shouldScroll = true;
        }
      }

      if (this.elements.length !== this.lastLength) {
        // Elements changed by pushing, shifting unshifting
        if (this.scrollOnChange) {
          this.shouldScroll = true;
        }
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
    }
  }

  /**
   * Scrolls the element to the bottom
   */
  private scrollToBottom() {
    this.shouldScroll = false;
    this.renderer.setProperty(this.hostElement.nativeElement.parentElement, 'scrollTop', this.hostElement.nativeElement.parentElement.scrollHeight);
  }
}
