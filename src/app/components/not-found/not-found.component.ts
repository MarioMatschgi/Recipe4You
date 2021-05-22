import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'src/libraries/services/localization.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  @Input('what') what: string;

  constructor(public local: LocalizationService) {}

  ngOnInit(): void {}
}
