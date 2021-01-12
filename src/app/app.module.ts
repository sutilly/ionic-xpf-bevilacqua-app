import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Camera} from '@ionic-native/camera/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';

import {environment} from '../environments/environment';
import { AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        EmailComposer,
        AngularFireDatabase,
        LocalNotifications,
        Vibration,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
