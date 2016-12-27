import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Image } from './image';
import { RegItem } from './regItem';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:8080/regressionWebService/webapi/images';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Image[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json() as Image[])
            .catch(this.handleError);
    }
    
    getHero(id: string): Promise<Image> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.software_version === id));
    }

    getRegItems(id: string): Promise<RegItem[]> {
        return this.http.get(this.heroesUrl + '/' + id + '/regItems')
            .toPromise()
            .then(response => response.json() as RegItem[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    update(item: RegItem): Promise<RegItem> {
        const url = `${this.heroesUrl}/${item.image.software_version}/regItems/${item.id}`;
        return this.http
            .put(url, JSON.stringify(item), { headers: this.headers })
            .toPromise()
            .then(() => item)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}