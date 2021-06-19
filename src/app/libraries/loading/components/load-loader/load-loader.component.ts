import { Component, OnInit } from '@angular/core';
import { LoadService } from '../../services/load.service';

@Component({
  selector: 'load-loader',
  templateUrl: './load-loader.component.html',
  styleUrls: ['./load-loader.component.scss'],
})
export class LoadLoaderComponent implements OnInit {
  constructor(public loader: LoadService) {}

  ngOnInit(): void {}
}
