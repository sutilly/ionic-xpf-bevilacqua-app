import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantDetailPage } from './plant-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlantDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantDetailPageRoutingModule {}
