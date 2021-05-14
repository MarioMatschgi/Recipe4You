import { LocalizationService } from 'src/app/services/localization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found-general',
  templateUrl: './not-found-general.component.html',
  styleUrls: ['./not-found-general.component.scss'],
})
export class NotFoundGeneralComponent implements OnInit {
  constructor(public local: LocalizationService) {}

  ngOnInit(): void {}
}
