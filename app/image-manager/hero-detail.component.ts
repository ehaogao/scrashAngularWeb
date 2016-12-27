// import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Image }        from '../services/image';
import { RegItem } from '../services/regItem';
import { HeroService } from '../services/hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  hero: Image;
  regItems: RegItem[];
  selectedItem: RegItem;

  // heroes = HEROES;
  

  // ngOnInit(): void {
  //   this.route.params
  //     .switchMap((params: Params) => this.heroService.getHero(+params['id']))
  //     .subscribe(hero => this.hero = hero);
  // }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      //      let id = +params['id'];
      let id = params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
      this.heroService.getRegItems(id)
        .then(data => this.regItems = data);
    });
  }

  goBack(): void {
    this.location.back();
  }

  modify(): void{
    this.router.navigate(['/regItems', this.selectedItem.id]);

  }

  onSelect(item: RegItem): void {
    this.selectedItem = item;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/