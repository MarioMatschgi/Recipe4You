import { Component, OnInit } from '@angular/core';
import { RouterUrls } from 'src/app/libraries/util/models/router.model';
import { RouterService } from 'src/app/libraries/util/services/router.service';

@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {
  RouterUrls = RouterUrls;

  constructor(public router: RouterService) {}

  ngOnInit(): void {}
}
