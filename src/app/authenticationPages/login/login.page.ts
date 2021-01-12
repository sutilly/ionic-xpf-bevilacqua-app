import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../provider/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    signInForm: FormGroup;
    errorMessage = null;

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
        public router: Router
    ) {
    }

    ngOnInit() {
        this.signInForm = new FormGroup({
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

    async loginUser(user): Promise<void> {
        try {
            await this.authService.login(user).then((userCredential) => {
                this.authService.userId = userCredential.user.uid;
            }).then(() => {
                this.router.navigate(['members']);
            })
        } catch (error) {
            this.errorMessage = error.message;
        }
    }

    ionViewWillEnter() {
        this.signInForm.reset();
    }

}
