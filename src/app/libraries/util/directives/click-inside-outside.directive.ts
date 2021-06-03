import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[clickInsideOutside]',
})
export class ClickInsideOutsideDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output('clickInsideOutside') clickOutside: EventEmitter<any> =
    new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  onMouseEnter(targetElement) {
    this.clickOutside.emit(
      this._elementRef.nativeElement.contains(targetElement)
    );
  }
}
