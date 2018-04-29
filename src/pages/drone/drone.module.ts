import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DronePage } from './drone';

@NgModule({
  declarations: [
    DronePage,
  ],
  imports: [
    IonicPageModule.forChild(DronePage),
  ],
})
export class DronePageModule {}
