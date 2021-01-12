import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterMePage } from './waterMe.page';

const routes: Routes = [
  {
    path: '',
    component: WaterMePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
