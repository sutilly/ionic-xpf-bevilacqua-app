import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../provider/auth.service';
import {Router} from '@angular/router';
import {LNotificiationService} from "../../provider/l-notificiation.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    notifications = true;

    constructor(
        public afAuthService: AuthService,
        private router: Router,
        private lNotificiationService: LNotificiationService
    ) {
    }

    ngOnInit() {
    }

    async logOutUser(): Promise<void> {
        await this.afAuthService.logoutUser().then(() => {
            this.afAuthService.setUser("");
            this.lNotificiationService.clearNotifications();
        }).then(()=> {
            this.router.navigate(['/login']);
        });
    }
}

