import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs';
import {EventEmitter} from '@angular/core';

export class Places {
  constructor(public id: number, public name: string) { }
}


// const PLACES = [
//   new Places(1, 'Dragon Burning Cities'),
//   new Places(2, 'Sky Rains Great White Sharks'),
//   new Places(3, 'Giant Asteroid Heading For Earth'),
//   new Places(4, 'Procrastinators Meeting Delayed Again'),
// ];

@Injectable()
export class PlacesService {
  public places$:string;
  private clickCnt:number = 0;

  onClick:EventEmitter<number> = new EventEmitter();

  public doClick(){
    this.clickCnt++;
    console.log(this.clickCnt);
    this.onClick.emit(this.clickCnt);
  }




  // Observable string sources
  // private missionAnnouncedSource = new Subject<string>();
  // private missionConfirmedSource = new Subject<string>();
 
  // // Observable string streams
  // missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();
 
  // // Service message commands
  // announceMission(mission: string) {
  //   console.log(mission);
  //   this.missionAnnouncedSource.next(mission);
  // }
 

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
