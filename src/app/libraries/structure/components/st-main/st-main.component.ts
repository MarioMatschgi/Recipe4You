import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'st-main',
  templateUrl: './st-main.component.html',
  styleUrls: ['./st-main.component.scss'],
})
export class StMainComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild('footer') footer: ElementRef;
  @ViewChild('wrapper_footer') wrapper_footer: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!(this.footer.nativeElement.children?.length > 0)) {
      this.wrapper_footer.nativeElement.remove();
    }
  }
}
