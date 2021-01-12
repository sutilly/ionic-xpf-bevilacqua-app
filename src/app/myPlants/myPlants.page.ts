import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, Platform} from '@ionic/angular';
import {JsonService} from '../provider/json.service';
import {Plant} from '../models/plant';
import {FirebaseService} from '../provider/firebase.service';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Vibration} from '@ionic-native/vibration/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'myPlants.page.html',
    styleUrls: ['myPlants.page.scss']
})

export class MyPlantsPage implements OnInit {

    public myPlants: Observable<Plant[]> = null;

    constructor(
        private plt: Platform,
        private router: Router,
        private alertCtrl: AlertController,
        private jsonService: JsonService,
        public firebaseService: FirebaseService,
        private afAuth: AngularFireAuth,
        private vibration: Vibration
    ) {
    }

    ngOnInit() {
        this.firebaseService.getUsersPlants().subscribe(userProfile => {
            if (userProfile) {
                this.myPlants = userProfile;
            }
        });
    }

    goToPlant(plantId: string) {
        return this.router.navigate(['/plant-detail', {plantId}]);
    }

    goToCareInfo() {
        return this.router.navigate(['/care']);
    }

    async showDeleteAlert() {
        this.vibration.vibrate(1000);
        const alert = await this.alertCtrl.create({
            header: 'Please confirm',
            message: 'Do you really want to delete <strong>all</strong> your plants?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel'
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.firebaseService.deleteAll();
                    }
                }
            ]
        });
        await alert.present();
    }


    async showBirthdayAlert(plant) {
        const alert = await this.alertCtrl.create({
            cssClass: 'bday-alert',
            header: 'Happy anniversary!',
            subHeader: 'Why don\'t you celebrate your friendship with ' + plant.name + ', the plant, by …',
            message: this.generateBirthdayIdea() + '?',
            buttons: ['OK']
        });

        await alert.present();
    }

    generateBirthdayIdea(): string {
        const randomIndex = Math.floor(+(Math.random() * (this.jsonService.birthdayIdeas.length)));
        const randomIdea = this.jsonService.birthdayIdeas[randomIndex];
        return randomIdea.idea;
    }

    /*calcBirthday(plant: Plant) {
    TODO: implement Birthday Note

     const todayIso = new Date().toISOString().slice(5, 10);
     const birthday = plant.birthday.slice(5, 10);

        if (todayIso === birthday) {
            return true;
        } else {
            return null;
        }
    }*/


}
