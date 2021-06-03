import { ThemesService } from './libraries/themes/services/themes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Recipe4you';

  constructor(public ts: ThemesService) {}

  ngOnInit() {}
}
