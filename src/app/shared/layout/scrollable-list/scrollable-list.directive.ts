import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollableList]'
})
export class ScrollableListDirective implements OnInit {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'flex', '1 1 auto');
    this.renderer.setStyle(this.element.nativeElement, 'overflow-y', 'auto');
    this.renderer.setStyle(this.element.nativeElement, 'height', '0px');
  }
}
