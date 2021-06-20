import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StMainComponent } from './components/st-main/st-main.component';
import { StContentComponent } from './components/st-content/st-content.component';

const components = [StMainComponent, StContentComponent];

/**
 * Module for Structure
 */
@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class StructureModule {}
