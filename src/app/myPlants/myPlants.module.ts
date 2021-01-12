import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyPlantsPage } from './myPlants.page';

import { Tab2PageRoutingModule } from './myPlants-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule
  ],
  declarations: [MyPlantsPage]
})
export class Tab2PageModule {}
