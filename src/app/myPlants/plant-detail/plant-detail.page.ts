import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {EditPlantModalComponent} from '../../edit-plant-modal/edit-plant-modal.component';
import {FirebaseService} from '../../provider/firebase.service';
import {Plant} from '../../models/plant';

@Component({
    selector: 'app-plant-detail',
    templateUrl: './plant-detail.page.html',
    styleUrls: ['./plant-detail.page.scss'],
})

export class PlantDetailPage implements OnInit {

    displayedPlant: Plant = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public afService: FirebaseService,
        private modalCtrl: ModalController) {
        this.activatedRoute.paramMap.subscribe(paraMap => {
            if (!paraMap.has('plantId')) {
                console.log('no detail page for this plant');
                return;
            }

            const plantId = paraMap.get('plantId');
            this.afService.getPlant(plantId).subscribe((plant: Plant) => {
                this.displayedPlant = plant;
            });
        });
    }


    ngOnInit() {
    }

    async showEditModal() {
        const modal = await this.modalCtrl.create({
            component: EditPlantModalComponent,
            componentProps: this.displayedPlant
        });

        await modal.present();
    }
}
