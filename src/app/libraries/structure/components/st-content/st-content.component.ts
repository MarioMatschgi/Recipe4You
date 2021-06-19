import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-content',
  templateUrl: './st-content.component.html',
  styleUrls: ['./st-content.component.scss'],
})
export class StContentComponent implements OnInit {
  @Input('data-head-path') data_head: { title: string; desc: string };
  @Input('data-level') data_level: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
