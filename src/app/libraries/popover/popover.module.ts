import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './components/popover.component';
import { UtilModule } from '../util/util.module';

const components = [PopoverComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, UtilModule],
  exports: components,
})
export class PopoverModule {}
