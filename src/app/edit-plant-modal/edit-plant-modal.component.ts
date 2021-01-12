import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {JsonService} from '../provider/json.service';
import {Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {Plant} from '../models/plant';
import {FirebaseService} from '../provider/firebase.service';

@Component({
    selector: 'app-edit-plant-modal',
    templateUrl: './edit-plant-modal.component.html',
    styleUrls: ['./edit-plant-modal.component.scss'],
})
export class EditPlantModalComponent implements OnInit {

    plantToEdit = this.fb.group({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
        species: new FormControl('', Validators.required),
        interval: new FormControl('', Validators.required),
        lastWatered: new FormControl('', Validators.required),
        birthday: new FormControl(''),
        description: new FormControl('', Validators.maxLength(200))
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

    editedPlant: Plant;
    picture: string;


    constructor(private navParams: NavParams, private modalCtrl: ModalController,
                private fb: FormBuilder,
                private router: Router,
                private alertCtrl: AlertController,
                public jsonService: JsonService,
                private camera: Camera,
                private actionSheetCtrl: ActionSheetController,
                private firebaseService: FirebaseService) {
    }

    options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    ngOnInit() {

        this.plantToEdit.patchValue({
            name: this.navParams.get('name'),
            species: this.navParams.get('species'),
            interval: this.navParams.get('interval'),
            lastWatered: this.navParams.get('lastWatered'),
            birthday: this.navParams.get('birthday'),
            description: this.navParams.get('description')
        });
        this.picture = this.navParams.get('imgSrc');
    }


    saveChanges() {
        this.editedPlant = this.plantToEdit.value;
        this.editedPlant.id = this.navParams.get('id');
        this.editedPlant.imgSrc = this.picture;
        if (this.editedPlant.imgSrc !== this.navParams.get('imgSrc')) {
            this.firebaseService.uploadImageToStorage(this.editedPlant.id, this.editedPlant.imgSrc);
        }
        this.firebaseService.updatePlant(this.editedPlant);
        this.router.navigateByUrl('/members/myPlants').then(() => {
                return this.modalCtrl.dismiss();
            });
    }

    async showAlert() {

        const alert = await this.alertCtrl.create({
            header: 'Please confirm',
            message: 'Do you really want to delete this plant?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel'
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.delete();
                    }
                }
            ]
        });

        await alert.present();
    }

    delete() {
        this.firebaseService.deletePlant(this.navParams.get('id')).then(() => {
            this.router.navigateByUrl('/members/myPlants').then(() => {
                return this.modalCtrl.dismiss();
            });
        });
    }

    dismissModal() {
        return this.modalCtrl.dismiss();
    }


    changePicture() {
        this.camera.getPicture(this.options).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.picture = base64Image;
        }, (err) => {
            console.log('Something went wrong.');
        });
    }

    async presentPhotoActionSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Change Plant Picture',
            buttons: [
                {
                    text: 'Take a photo',
                    handler: () => {
                        this.options.sourceType = this.camera.PictureSourceType.CAMERA;
                        this.changePicture();
                    }
                },
                {
                    text: 'Choose from gallery',
                    handler: () => {
                        this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
                        this.changePicture();
                    }
                },
                {text: 'Cancel', role: 'cancel'}
            ]
        });
        await actionSheet.present();
    }
}
