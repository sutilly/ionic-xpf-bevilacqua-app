import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from "./provider/auth.service";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {FirebaseService} from "./provider/firebase.service";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private afAuth: AngularFireAuth,
        private currentUser: AuthService,
) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            // check login status
            this.afAuth.authState.subscribe(user => {
                if (user) {
                    this.currentUser.setUser(user.uid);
                } else {
                    this.currentUser.setUser(null);
                    console.log("initialize: no user logged in");
                }
            });
        });
    }
}
