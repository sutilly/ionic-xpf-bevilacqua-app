import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import 'firebase/firestore';
import firebase from 'firebase/app';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public userId: string;

    constructor(
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {}

    getUser() {
        return this.userId;
    }

    setUser(userId) {
        this.userId = userId
    }

    login(user): Promise<firebase.auth.UserCredential> {
            return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    }

    async register(user): Promise<firebase.auth.UserCredential> {
        try {
            const newUserCredential: firebase.auth.UserCredential = await this.afAuth.createUserWithEmailAndPassword(
                user.email,
                user.password
            );
            await this.firestore
                .doc(`Users/${newUserCredential.user.uid}`).collection('Plants');
            return newUserCredential;
        } catch (error) {
            throw error;
        }
    }

    logoutUser(): Promise<void> {
        return this.afAuth.signOut();
    }

}
