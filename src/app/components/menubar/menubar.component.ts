import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/libraries/services/router.service';

@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {
  constructor(public router: RouterService) {}

  ngOnInit(): void {}
}
