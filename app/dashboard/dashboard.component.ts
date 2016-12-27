import { Component, OnInit } from '@angular/core';

import { Image }        from '../services/image';
import { RegdbService } from '../services/regdb.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  images: Image[] = [];

  constructor(private regdbService: RegdbService) { }

  ngOnInit(): void {
    this.regdbService.getImages()
      .then(images => this.images = images.slice(1, 5));
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/