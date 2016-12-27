import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { ImageSearchService } from '../services/image-search.service';
import { Image } from '../services/image';

@Component({
  moduleId: module.id,
  selector: 'image-search',
  templateUrl: 'image-search.component.html',
  styleUrls: [ 'image-search.component.css' ],
  providers: [ImageSearchService]
})
export class ImageSearchComponent implements OnInit {
  images: Observable<Image[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private imageSearchService: ImageSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.images = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.imageSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Image[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Image[]>([]);
      });
  }

  gotoDetail(image: Image): void {
    let link = ['/detail', image.software_version];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/