import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/libraries/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Recipe4you';

  constructor(public ts: ThemeService) {}

  ngOnInit() {}
}
