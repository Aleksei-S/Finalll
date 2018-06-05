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
		public photoUrl: any,
		public rate: any,
		public location: any
		) { }
}

// const currentPlace = new Places ('', '','' , '', '', {});

@Injectable()
export class PlacesService {

constructor(public router:Router,
              private zone: NgZone,) {}




	public map : any;
	public google : any;
public listPlaces = [];
  public markers = [];
  public mapReady: BehaviorSubject<any> = new BehaviorSubject<any>(false);
	public currentPlace$ : BehaviorSubject<Places> = new BehaviorSubject<Places>(new Places ('', '','' , '', '', {}));








	// public doClick(){
	//   if (this.map) {
	//      this.getNearPlaces();
	//   } else {
	//     this.subscription1 = this.mapReadyUpload.subscribe(
	//       (mission) => {
	//         console.log('mapReadyUpload');
	//         this.doClick();
	//     });
	//     }
	// }


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

// }

// createMarker(place) {
//  console.log(place);
//         var placeLoc = place.geometry.location;
//         var marker = new this.google.maps.Marker({
//           map: this.map,
//           position: place.geometry.location
//         });
// }


// async getPrice(currency: string): Promise<number> {
//     const response = await this.http.get(this.currentPriceUrl).toPromise();
//     return response.json().bpi[currency].rate;
//   }

//  async ngOnInit() {
//     this.price = await this.priceService.getPrice(this.currency);
//   }




getTextSearchPlaces(text, type=''){
	let request = {
		query: text,
		location: this.map.getCenter(),
		radius: '1000',
		type: type
	};


				// let input = text;
				// let searchBox = new google.maps.places.SearchBox(input);
				// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				// // Bias the SearchBox results towards current map's viewport.
				// map.addListener('bounds_changed', function() {
				//   searchBox.setBounds(map.getBounds());
				// });


	// https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

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
    console.log("addMarker Service");
    // console.log(e);
    if (e.placeId || e.place_id) {
        // this.getDetailsMarker(e);
        let marker = new this.google.maps.Marker({
            position: e.latLng || e.geometry.location,
            map: this.map
        });
        console.log('push');
        this.markers.push(marker);
    }

        // let icon = {
        //       url: e.icon,
        //       size: new this.google.maps.Size(71, 71),
        //       origin: new this.google.maps.Point(0, 0),
        //       anchor: new this.google.maps.Point(17, 34),
        //       scaledSize: new this.google.maps.Size(25, 25)
        //     };



    // marker.addListener('rightclick',(e)=>{
    //   console.log(e);
    // });
//   marker.addListener('click',(e)=>{
//     console.log('marker');
//     console.log(e);
//     var geocoder = new google.maps.Geocoder();
// // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
// // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
//     geocoder.geocode({'location': e.latLng},(z)=>{
//       console.log(z);
//       // this.router.navigate(['/places', { name: '', address: z[0].formatted_address, photo: ''}], { relativeTo: this.activatedRoute });
//       // this.getDetailsMarker(z[0]);
//     });
//   });
}




getDetails(e){
    console.log('getDetailsMarker SERVICE');
    var service = new this.google.maps.places.PlacesService(this.map);
 service.getDetails({placeId: e}, (place, status) =>{
     console.log(place);
        let placeId = e.placeId || e.place_id;
        let name = place.name || "";
        let adress = place.formatted_address || place.address || "";
        let photoUrl =  (place.photos) ? place.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}) : "";
        let rate =  place.rating || "";
        let location =  place.geometry.location;
        this.currentPlace$.next({placeId, name, adress, photoUrl, rate,  location});
 });
}


// this.placesService.currentPlace$ = new Places(placeId, name, address, photoUrl, rate, phone_number, location);

// //         console.log(place);
// // // console.log(this.placesService.map.getCenter());
// // // this.getNearPlaces();
// //         this.zone.run(() => {
// //             this.router.navigate(['/places', e.placeId])
// //         });




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
