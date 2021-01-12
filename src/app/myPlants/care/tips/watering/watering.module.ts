import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WateringPageRoutingModule } from './watering-routing.module';

import { WateringPage } from './watering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WateringPageRoutingModule
  ],
  declarations: [WateringPage]
})
export class WateringPageModule {}
