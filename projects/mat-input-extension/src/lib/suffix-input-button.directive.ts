import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[suffix-button-container]'
})
export class SuffixInputButtonDirective implements OnInit {

  constructor(private readonly el: ElementRef, private readonly render: Renderer2) {
  }

  ngOnInit(): void {
    this.render.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.render.setStyle(this.el.nativeElement, 'top', '50%');
    this.render.setStyle(this.el.nativeElement, 'right', '10%');
    this.render.setStyle(this.el.nativeElement, 'transform', 'translateY(-50%)');
    this.el.nativeElement.querySelectorAll('button').forEach((button: { nativeElement: any; }) => {
      if (button !== undefined) {
        this.render.setStyle(button.nativeElement, 'display', 'inline-block !important');
      }
    });
  }

}
