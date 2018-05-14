import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';



export class Places {
  constructor(public id: number, public name: string) { }
}


const PLACES = [
  new Places(1, 'Dragon Burning Cities'),
  new Places(2, 'Sky Rains Great White Sharks'),
  new Places(3, 'Giant Asteroid Heading For Earth'),
  new Places(4, 'Procrastinators Meeting Delayed Again'),
];





@Injectable()
export class PlacesService {
  // private places$: <Places[]>(PLACES);
  constructor() { }

  getPlaces() {
    return Observable.of(PLACES);
    // return this.crises$;
  }

// getPlace(id: number | string) {
//     return this.getCrises()
//       .map(crises => crises.find(crisis => crisis.id === +id));
//   }

// addPlace(name: string) {
//     name = name.trim();
//     if (name) {
//       let crisis = new Crisis(CrisisService.nextCrisisId++, name);
//       CRISES.push(crisis);
//       this.crises$.next(CRISES);
//     }
//   }

}
