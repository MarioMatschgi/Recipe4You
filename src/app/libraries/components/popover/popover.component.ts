import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  static popovers = [];

  isOpen: boolean;
  @Input() position: 'normal' | 'center' = 'normal';
  /**
   * align only possible if position is `normal`
   */
  @Input() align: 'center' | 'left' | 'right' = 'center';

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keyup.escape', ['$event'])
  keydown(event: KeyboardEvent) {
    // Check if this is the front-most popover
    if (PopoverComponent.popovers[PopoverComponent.popovers.length - 1] == this)
      this.set(false);
  }

  toggle() {
    this.set(!this.isOpen);
  }

  set(isOpen) {
    setTimeout(() => {
      this.isOpen = isOpen;

      if (this.isOpen) PopoverComponent.popovers.push(this);
      else
        PopoverComponent.popovers.splice(
          PopoverComponent.popovers.findIndex((e) => e == this),
          1
        );
    }, 0);
  }

  hide_if_open() {
    if (this.isOpen) this.set(false);
  }
}
