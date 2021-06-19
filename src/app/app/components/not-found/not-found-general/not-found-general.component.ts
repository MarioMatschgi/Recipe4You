import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';

@Component({
  selector: 'not-found-general',
  templateUrl: './not-found-general.component.html',
  styleUrls: ['./not-found-general.component.scss'],
})
export class NotFoundGeneralComponent implements OnInit {
  constructor(public local: LocalizationService) {}

  ngOnInit(): void {}
}
