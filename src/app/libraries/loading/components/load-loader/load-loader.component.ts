import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LoadService } from '../../services/load.service';

@Component({
  selector: 'load-loader',
  templateUrl: './load-loader.component.html',
  styleUrls: ['./load-loader.component.scss'],
})
export class LoadLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('loader_parent') loader_parent: ElementRef;

  loader_idx: number;

  constructor(public loader: LoadService, private changes: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loader_idx = Math.floor(Math.random() * 3);
    this.changes.detectChanges();
  }
}
