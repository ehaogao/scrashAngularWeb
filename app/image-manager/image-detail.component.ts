// import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Image }        from '../services/image';
import { RegItem } from '../services/regItem';
import { RegdbService } from '../services/regdb.service';

@Component({
  moduleId: module.id,
  selector: 'selected-image-detail',
  templateUrl: 'image-detail.component.html',
  styleUrls: [ 'image-detail.component.css' ]
})
export class ImageDetailComponent implements OnInit {

  constructor(
    private regdbService: RegdbService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  image: Image;
  regItems: RegItem[];
  selectedItem: RegItem;

  // heroes = HEROES;
  

  // ngOnInit(): void {
  //   this.route.params
  //     .switchMap((params: Params) => this.regdbService.getHero(+params['id']))
  //     .subscribe(hero => this.hero = hero);
  // }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      //      let id = +params['id'];
      let id = params['id'];
      this.regdbService.getImage(id)
        .then(image => this.image = image);
      this.regdbService.getRegItems(id)
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