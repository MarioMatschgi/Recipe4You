import { Component, OnInit } from '@angular/core';
import { LoadService } from '../libraries/loading/services/load.service';
import { ThemesService } from '../libraries/themes/services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Recipe4you';

  constructor(public ts: ThemesService, public loader: LoadService) {}

  ngOnInit() {}
}
