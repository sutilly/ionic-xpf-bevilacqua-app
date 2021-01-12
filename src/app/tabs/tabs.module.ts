import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {AddPlantModalComponent} from '../add-plant-modal/add-plant-modal.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [TabsPage, AddPlantModalComponent]
})
export class TabsPageModule {
}
