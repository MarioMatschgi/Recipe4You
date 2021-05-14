import { LocalizationService } from 'src/app/services/localization.service';
import { Component, Input, OnInit } from '@angular/core';

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
