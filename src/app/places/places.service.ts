import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Places {
  constructor(
    public adress: any,
    public location: any,
    public name: any,
    public photoUrlarr: any[],
    public placeId: any,
    public rate: any
  ) { }
}

@Injectable()
export class PlacesService {
  public currentPlace$: BehaviorSubject<Places> = new BehaviorSubject<Places>(new Places('', '', '', [], '', {}));
  public emitRightClickOnMarker = new EventEmitter();
  public google: any;
  public listPlaces = [];
  public map: any;
  public mapReady: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public markers = [];
  public preventLeftclick = false;

  constructor(
    public router: Router,
    private zone: NgZone
  ) { }

  addMarker(e) {
    if (e.placeId || e.place_id) {
      const marker = new this.google.maps.Marker({
        position: e.latLng || e.geometry.location,
        map: this.map
      });
      marker.addListener('rightclick', (event) => {
        console.log('rightclick');
        this.emitRightClickOnMarker.emit({ 'marker': marker, 'event': event, 'placeId': e.placeId || e.place_id });
      });
      this.markers.push(marker);
      return marker;
    }

  }

  deleteMarkers() {
    this.markers.forEach(function (marker) {
      marker.setMap(null);
    });
    this.markers = [];
  }

  getDetails(e) {
    console.log('getDetailsMarker SERVICE');
    const service = new this.google.maps.places.PlacesService(this.map);
    service.getDetails({ placeId: e }, (place, status) => {
      console.log(place);
      const placeId = e.placeId || e.place_id;
      const name = place.name || '';
      const adress = place.formatted_address || place.address || '';
      const photoUrlarr = [];
      if (place.photos) {
        for (let i = place.photos.length - 1; i >= 0; i--) {
          photoUrlarr.push(place.photos[i].getUrl({ 'maxWidth': 300, 'maxHeight': 300 }));
        }
      }
      const rate = place.rating || '';
      const location = place.geometry.location;
      this.currentPlace$.next({ placeId, name, adress, photoUrlarr, rate, location });
    });
  }



  getTextSearchPlaces(text, type = '') {
    // let request = {
    //     query: text,
    //     location: this.map.getCenter(),
    //     radius: '1000',
    //     type: type
    // };

    // const service = new this.google.maps.places.PlacesService(this.map);
    // service.textSearch(request, (results, status) => {
    //     if (status === this.google.maps.places.PlacesServiceStatus.OK) {
    //         for (var i = 0; i < results.length; i++) {
    //             let place = results[i];
    //             console.log("place");
    //         }
    //     }
    // });

  }



}
