import {Component, NgZone, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../provider/auth.service';
import {Router} from '@angular/router';
import {FirebaseService} from '../../provider/firebase.service';
import firebase from 'firebase/app';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    errorMessage: null;

    validationMessages = {
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 6 characters long.'}
        ]
    };

    constructor(
        public authService: AuthService,
        private firebaseService: FirebaseService,
        private router: Router,
        private toastCtrl: ToastController
    ) {
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(6),
                Validators.required
            ]))
        });
    }

    async registerUser(newUser) {
        try {
            const userCredential: firebase.auth.UserCredential = await this.authService.register(newUser);
            this.authService.userId = userCredential.user.uid;
        } catch (error) {
            this.errorMessage = error.message;
        }
        await this.showRegistrationSuccessToast().then(() => this.router.navigate(['members']));
    }

    async showRegistrationSuccessToast() {
        const toast = await this.toastCtrl.create({
            message: 'Registration successful!',
            duration: 3000
        });
        await toast.present();
    }

    ionViewWillEnter() {
        this.registerForm.reset();
    }
}
