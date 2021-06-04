import { Component, OnInit } from '@angular/core';
import {
  RouterService,
  RouterUrls,
} from 'src/app/libraries/util/services/router.service';

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
