import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddPlantModalComponent} from '../add-plant-modal/add-plant-modal.component';


@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(private modalCtrl: ModalController) {
    }

    async addModal() {

        const modal = await this.modalCtrl.create({
            component: AddPlantModalComponent
        });

        await modal.present();
    }
}
