import {Component, OnInit} from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {EmailComposer, EmailComposerOptions} from '@ionic-native/email-composer/ngx';
import {FirebaseService} from '../provider/firebase.service';
import {Router} from '@angular/router';
import {Plant} from '../models/plant';
import {LNotificiationService} from "../provider/l-notificiation.service";

@Component({
    selector: 'app-tab1',
    templateUrl: 'waterMe.page.html',
    styleUrls: ['waterMe.page.scss']
})

export class WaterMePage implements OnInit {

    public duePlants: Plant[] = null;
    public overduePlants: Plant[] = null;

    constructor(private pltForm: Platform,
                private firebaseService: FirebaseService,
                private emailComposer: EmailComposer,
                private alertCtrl: AlertController,
                private router: Router,
                private lNotificationService: LNotificiationService,
                private platform: Platform
    ) {
    }

    ngOnInit() {
        this.firebaseService.getUsersPlants().subscribe(userProfile => {

            // filter (over)due plants from users plants collections
                const plants = this.firebaseService.getDuePlants();
                this.duePlants = plants[0];
                this.overduePlants = plants[1];

                // register notifications and check permission
                if (!this.platform.is("desktop")) {
                    this.lNotificationService.registerNotifications();
                }
            });
    }

    watered(plantId) {
        return this.firebaseService.waterPlant(plantId);
    }

    goToSettings() {
        return this.router.navigate(['/settings']);
    }

    // Email Composer Plugin

    shareViaEmail() {
        const currentListAsString = this.convertListItemsToHTML();
        const email: EmailComposerOptions = {
            subject: 'Plants to Water Today',
            body: currentListAsString,
            isHtml: true
        };

        this.emailComposer.open(email);
    }

    convertListItemsToHTML(): string {
        let currentListAsString = '';
        this.duePlants.forEach((plant) => {
            currentListAsString += `${plant.name} (${plant.species}): ${plant.description}<br>`;
        });
        return currentListAsString;
    }

    // for testing purpose on emulator
    async showEmailAlert(listToString) {
        const alert = await this.alertCtrl.create({
            header: 'Email not available',
            message: listToString,
        });
        await alert.present();
    }

    scheduleNotifications() {
        if (this.overduePlants && this.duePlants) {
            this.lNotificationService.scheduleDueNotification();
            this.lNotificationService.scheduleOverdueNotification();
        } else if (this.overduePlants) {
            this.lNotificationService.scheduleOverdueNotification();
        } else if (this.duePlants) {
            this.lNotificationService.scheduleDueNotification();
        } else {
            this.lNotificationService.clearNotifications();
        }
    }
}

