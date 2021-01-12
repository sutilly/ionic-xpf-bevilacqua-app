import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {JsonService} from '../provider/json.service';
import {Router} from '@angular/router';
import {FirebaseService} from '../provider/firebase.service';

@Component({
    selector: 'app-add-plant-modal',
    templateUrl: './add-plant-modal.component.html',
    styleUrls: ['./add-plant-modal.component.scss'],
})

export class AddPlantModalComponent {

    get name() {
        return this.newPlant.get('name');
    }

    get interval() {
        return this.newPlant.get('interval');
    }

    get lastWatered() {
        return this.newPlant.get('lastWatered');
    }

    get species() {
        return this.newPlant.get('species');
    }

    newPlant = this.fb.group({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
        species: new FormControl('', Validators.required),
        interval: new FormControl('', Validators.required),
        lastWatered: new FormControl('', Validators.required),
        birthday: new FormControl(''),
        description: new FormControl('', Validators.maxLength(200)),
    });

    public errorMessages = {
        name: [
            {type: 'required', message: 'This field is required.'},
            {type: 'maxlength', message: 'Plant name can\'t exceed 20 characters.'},
            {type: 'minlength', message: 'Plant name must be at least 3 characters.'}
        ],
        species: [
            {type: 'required', message: 'This field is required.'}
        ],
        interval: [
            {type: 'required', message: 'This field is required.'},
        ],
        lastWatered: [
            {type: 'required', message: 'This field is required.'},
        ],
        description: [
            {type: 'maxlength', message: 'Description can\'t exceed 200 characters.'}
        ]
    };

    constructor(private modalCtrl: ModalController,
                private fb: FormBuilder,
                private firebaseService: FirebaseService,
                private router: Router,
                public jsonService: JsonService) {
    }

    dismissModal() {
        return this.modalCtrl.dismiss();
    }

    submit() {
        const plantToAdd = this.newPlant.value;
        plantToAdd.bdayNote = false;
        plantToAdd.imgSrc = this.getImageSource(plantToAdd.species);

        this.firebaseService.addPlant(plantToAdd).then(() => {
            this.router.navigateByUrl('/members/myPlants').then(() => {
                return this.dismissModal();
            });
        });
    }

    getImageSource(species) {
        switch (species) {
            case 'Alocasia sanderiana':
                return 'assets/images/alocasia.png';
            case 'Begonia albopicta':
                return 'assets/images/begonia.png';
            case 'Clusia major':
                return 'assets/images/clusia.png';
            case 'Epipremnum pinnatum':
                return 'assets/images/epipremnum.png';
            case 'Ficus glumosa':
                return 'assets/images/ficus.png';
            case 'Monstera deliciosa':
                return 'assets/images/monstera.png';
            case 'Musa basjoo':
                return 'assets/images/musa.png';
            case 'Species unknown':
                return 'assets/images/unknown.png';
        }
    }
}

