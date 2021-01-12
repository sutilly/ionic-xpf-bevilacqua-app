import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'app-care',
    templateUrl: './care.page.html',
    styleUrls: ['./care.page.scss'],
})
export class CarePage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToWateringTips() {
        return this.router.navigate(['watering']);
    }
}
