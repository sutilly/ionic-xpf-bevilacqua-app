import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {EditPlantModalComponent} from '../../edit-plant-modal/edit-plant-modal.component';

import {IonicModule} from '@ionic/angular';

import {PlantDetailPage} from './plant-detail.page';

const routes: Routes = [
    {
        path: '',
        component: PlantDetailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [PlantDetailPage, EditPlantModalComponent]
})
export class PlantDetailPageModule {
}
