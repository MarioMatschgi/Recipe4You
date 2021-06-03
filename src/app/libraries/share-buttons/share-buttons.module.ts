import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsComponent } from './components/share-buttons.component';

const modules = [ShareButtonsComponent];

@NgModule({
  declarations: modules,
  imports: [CommonModule],
  exports: modules,
})
export class ShareButtonsModule {}
