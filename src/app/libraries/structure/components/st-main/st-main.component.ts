import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

/**
 * Component for Main content
 */
@Component({
  selector: 'st-main',
  templateUrl: './st-main.component.html',
  styleUrls: ['./st-main.component.scss'],
})
export class StMainComponent implements OnInit, AfterViewInit {
  /**
   * Footer element
   */
  @ViewChild('footer') footer: ElementRef;

  /**
   * Wrapper element of the footer
   */
  @ViewChild('wrapper_footer') wrapper_footer: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!(this.footer.nativeElement.children?.length > 0)) {
      this.wrapper_footer.nativeElement.remove();
    }
  }
}
