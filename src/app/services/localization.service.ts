import { Injectable } from '@angular/core';
import * as data_en from '../../lang/english.json';
import * as data_de from '../../lang/german.json';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  data: typeof data_en;

  constructor() {
    this.data = (data_en as any).default;
    this.data = (data_de as any).default;
  }
}
