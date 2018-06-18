import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Router }  from '@angular/router';
// declare var google : any;

export class Places {
    constructor(
        public placeId: any,
        public name: any,
        public adress: any,
        public photoUrlarr: any[],
        public rate: any,
        public location: any
        ) { }
}

// const currentPlace = new Places ('', '','' , '', '', {});

@Injectable()
export class PlacesService {
    public map : any;
    public google : any;
    public listPlaces = [];
    public markers = [];
    public mapReady: BehaviorSubject<any> = new BehaviorSubject<any>(false);
    public currentPlace$ : BehaviorSubject<Places> = new BehaviorSubject<Places>(new Places ('', '','' , [], '', {}));
    public emitRightClickOnMarker = new EventEmitter();
    public preventLeftclick = false;

    constructor(public router:Router,
        private zone: NgZone) {}


//  getNearPlaces(types='store'){
//   let request = {
//     location: this.map.getCenter(),
//     radius: '1000',
//     types: []
//   };

//   let service = new this.google.maps.places.PlacesService(this.map);
//   service.nearbySearch(request, (results, status)=>{
//     if (status == this.google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//           var place = results[i];
//           this.addPlaces(place);
//           this.createMarker(place);
//       }
//     }
//   });






getTextSearchPlaces(text, type=''){
    let request = {
        query: text,
        location: this.map.getCenter(),
        radius: '1000',
        type: type
    };

    let service = new this.google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status)=>{
        if (status == this.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                console.log("place");
            }
        }
    });

}

deleteMarkers(){
    this.markers.forEach(function(marker) {
        marker.setMap(null);
    });
    this.markers = [];
}

addMarker(e){
// console.log("addMarker");
// console.log(e);
    if (e.placeId || e.place_id) {

        let marker = new this.google.maps.Marker({
            position: e.latLng || e.geometry.location,
            map: this.map
        });
        marker.addListener('rightclick',(event)=>{
            console.log('rightclick');
            this.emitRightClickOnMarker.emit({'marker':marker, 'event':event, 'placeId':e.placeId || e.place_id});
        });
        this.markers.push(marker);
        return marker;
    }

}




getDetails(e){
    console.log('getDetailsMarker SERVICE');
    var service = new this.google.maps.places.PlacesService(this.map);
    service.getDetails({placeId: e}, (place, status) =>{
        console.log(place);
        let placeId = e.placeId || e.place_id;
        let name = place.name || "";
        let adress = place.formatted_address || place.address || "";
        let photoUrlarr = []
        if (place.photos) {
            for (var i = place.photos.length - 1; i >= 0; i--) {
                photoUrlarr.push(place.photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300}));
            }
        }
        // let photoUrl =  (place.photos) ? place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 300}) : "";
        let rate =  place.rating || "";
        let location =  place.geometry.location;
        this.currentPlace$.next({placeId, name, adress, photoUrlarr, rate,  location});
    });
}



// // // console.log(this.placesService.map.getCenter());
// // // this.getNearPlaces();
// //         this.zone.run(() => {
// //             this.router.navigate(['/places', e.placeId])
// //         });





}
