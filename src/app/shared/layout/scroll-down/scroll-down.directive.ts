import { Directive, Input, OnChanges, SimpleChanges, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollDown]'
})
export class ScrollDownDirective implements OnChanges, AfterViewChecked {

  /**
   * The input to check for changes
   */
  @Input('appScrollDown')
  public elements: any;

  /**
   * Determines if we should scroll down
   */
  private shouldScroll = false;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.shouldScroll = true;
  }

  /**
   * Scrolls the elemeent to the bottom
   */
  private scrollToBottom() {
    if (this.shouldScroll) {
      this.renderer.setProperty(this.hostElement.nativeElement.parentElement, 'scrollTop', this.hostElement.nativeElement.parentElement.scrollHeight);
      this.shouldScroll = false;
    }
  }
}
