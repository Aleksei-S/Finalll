import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
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
  public map : any;
  public google : any;

  public GooglePlaceService: Subject<any> = new Subject<any>();
  public clickCnt: number = 0;
  public places$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(PLACES);
  public onClick:EventEmitter<number> = new EventEmitter();


  getPlaces() {
      return this.places$;
  }

  addPlaces(ss){
    PLACES.push(ss);
    this.places$.next(PLACES);
  }




  public doClick(){
    this.clickCnt++;
    console.log(this.clickCnt);
    this.onClick.emit(this.clickCnt);
  }


 getNearPlaces(types='store'){
  let request = {
    location: this.map.getCenter(),
    radius: ' 1000',
    types: [types]
  };

   let service = new this.google.maps.places.PlacesService(this.map);
   service.nearbySearch(request, (results, status)=>{
       if (status == this.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        this.createMarker(place);
    }
  }
   });

}

createMarker(place) {
   // console.log(place);
        var placeLoc = place.geometry.location;
        var marker = new this.google.maps.Marker({
          map: this.map,
          position: place.geometry.location
        });
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
