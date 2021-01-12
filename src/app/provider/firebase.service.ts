import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import {Plant} from '../models/plant';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from "@angular/fire/auth";
import {AppComponent} from "../app.component";


@Injectable({
    providedIn: 'root'
})


export class FirebaseService {

    private userProfile: AngularFirestoreCollection;

    constructor(
        private afStore: AngularFirestore,
        private authService: AuthService,
        private afStorage: AngularFireStorage,
    ) {
    }

    getUsersPlants(): Observable<any> {
        const currentUser = this.authService.getUser();
        if (currentUser) {
            this.userProfile = this.afStore.doc(`Users/${currentUser}`).collection('Plants')
        }
        return this.userProfile.valueChanges();
    }


    addPlant(plant: Plant) {
        plant.id = this.afStore.createId();
        return this.userProfile.doc(`${plant.id}`)
            .set(plant);
    }

    getPlant(plantId: string) {
        return this.userProfile.doc(plantId)
            .valueChanges();
    }

    deletePlant(plantId: string) {
        return this.userProfile.doc(plantId).delete();
    }

    deleteAll() {
        this.userProfile.get().subscribe(snapshot => {
            snapshot.docs.forEach(plant => {
                const currentPlant = {...plant.data()} as Plant;
                this.deletePlant(currentPlant.id);
            });
        });
    }

    updatePlant(plant: Plant) {
        return this.userProfile.doc(plant.id).update(
            {
                name: plant.name,
                species: plant.species,
                interval: plant.interval,
                lastWatered: plant.lastWatered,
                birthday: plant.birthday,
                description: plant.description,
            });
    }

    waterPlant(plantId) {
        return this.userProfile.doc(plantId).update({
            lastWatered: new Date().toISOString()
        });
    }

    hasBirthday(plant: Plant) {
        const todayIso = new Date().toISOString().slice(5, 10);
        const birthday = plant.birthday.slice(5, 10);

        if (todayIso === birthday) {
            return true;
        } else {
            return null;
        }
    }

    getDuePlants() {
        const duePlants: Plant[] = [];
        const overduePlants: Plant[] = [];

        this.userProfile.get().subscribe(snapshot => {
            snapshot.docs.forEach(plant => {
                const currentPlant = {...plant.data()} as Plant;
                const intervalInDays = this.calcIntervalInDays(currentPlant.interval);
                const diffInDaysTilToday = this.calcDiffInDaysTilToday(currentPlant.lastWatered);

                if (diffInDaysTilToday === intervalInDays) {
                    duePlants.push(currentPlant);
                } else if (diffInDaysTilToday > intervalInDays) {
                    overduePlants.push(currentPlant);
                }
            });
        });

        return [duePlants, overduePlants];
    }

    // calculate the number of days passed since last time watered until today
    calcDiffInDaysTilToday(lastWatered) {
        const today = new Date().getTime();
        const daysBetween = Math.abs(today - new Date(lastWatered).getTime());
        return Math.round(daysBetween / (1000 * 3600 * 24));
    }

    calcIntervalInDays(interval) {
        switch (interval) {
            case 'Every day':
                return 1;
            case 'Every 2 days':
                return 2;
            case 'Every 3 days':
                return 3;
            case 'Every 4 days':
                return 4;
            case 'Every 5 days':
                return 5;
            case 'Every 6 days':
                return 6;
            case 'Once a week':
                return 7;
            case 'Every 2 weeks':
                return 14;
            default:
                console.log('no interval selected');
        }
    }

    uploadImageToStorage(id, image64) {
        return new Promise<any>((resolve, reject) => {
            const storageRef = this.afStorage.ref('images');
            const imageRef = storageRef.child(id);
            if (image64 && image64.length) {
                imageRef.putString(image64, 'data_url').then(snapshot => {
                    snapshot.ref.getDownloadURL()
                        .then(res => {
                                return this.userProfile.doc(id).update(
                                    {imgSrc: res});
                            },
                            err => {
                                reject(err);
                            });
                });
            }
        });
    }
}
