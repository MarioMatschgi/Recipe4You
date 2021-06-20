import { Component, Input, OnInit } from '@angular/core';

/**
 * Component for Content
 */
@Component({
  selector: 'st-content',
  templateUrl: './st-content.component.html',
  styleUrls: ['./st-content.component.scss'],
})
export class StContentComponent implements OnInit {
  /**
   * Data for the head: Title and description
   */
  @Input('data-head-path') data_head: { title: string; desc: string };

  /**
   * Level
   */
  @Input('data-level') data_level: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
