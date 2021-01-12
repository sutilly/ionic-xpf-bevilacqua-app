import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class JsonService {

    plantSpecies = [];
    birthdayIdeas = [];

    constructor(private http: HttpClient) {
        this.http.get('../assets/JSONfiles/plantInfo.json').toPromise().then(data => {
            this.setBirthdayIdeas(data);
            this.setPlantSpecies(data);
        });
    }

    setPlantSpecies(data) {
        this.plantSpecies = data.plants;
    }

    setBirthdayIdeas(data) {
        this.birthdayIdeas = data.birthdayIdeas;
    }
}


