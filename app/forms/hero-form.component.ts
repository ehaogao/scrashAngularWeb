import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';
import { RegItem } from '../services/RegItem';
import { Hero} from '../services/hero';

@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'hero-form.component.html'
})
export class HeroFormComponent {

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  regItem: RegItem;
  model;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.model = new Hero(id, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    });
  }

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];
  // model = new Hero(this.info, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  newHero() {
    this.model = new Hero(42, '', '');
  }
  get diagnostic() { return JSON.stringify(this.model); }

  goBack(): void {
    this.location.back();
  }
}