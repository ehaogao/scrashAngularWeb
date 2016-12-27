import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Image }                from '../services/image';
import { RegdbService }         from '../services/regdb.service';

@Component({
  moduleId: module.id,
  selector: 'image-set',
  templateUrl: 'images.component.html',
  styleUrls: [ 'images.component.css' ]
})
export class ImagesComponent implements OnInit {
  images: Image[];
  selectedImage: Image;

  constructor(
    private regdbService: RegdbService,
    private router: Router) { }

  getImages(): void {
    this.regdbService
        .getImages()
        .then(images => this.images = images);
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.regdbService.create(name)
  //     .then(hero => {
  //       this.heroes.push(hero);
  //       this.selectedHero = null;
  //     });
  // }

  delete(image: Image): void {
    this.regdbService
        .delete(image.software_version)
        .then(() => {
          this.images = this.images.filter(h => h !== image);
          if (this.selectedImage === image) { this.selectedImage = null; }
        });
  }

  ngOnInit(): void {
    this.getImages();
  }

  onSelect(image: Image): void {
    this.selectedImage = image;
    this.router.navigate(['/detail', this.selectedImage.software_version]);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedImage.software_version]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/