import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlacesService }  from '../places/places.service';
import { Router }  from '@angular/router';
declare var google : any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {


// public ok:EventEmitter<number> = new EventEmitter();


public map: any;
public coords : any;

private url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_314OxmWH6Shuz2aBlL90oP3ObvOapMQ&libraries=places&callback=__onGoogleLoaded";
private loadAPI: Promise<any>

  constructor(public router:Router, public placesService:PlacesService, private zone: NgZone) {
		/////////////
		// this.placesService.onClick.subscribe(cnt => this.clickCnt = cnt);

  this.loadAPI = new Promise((resolve) => {
		window['__onGoogleLoaded'] = (ev) => {
		console.log('gapi loaded')
		console.log(window);
		resolve(ev);
		}
		this.loadScript();
	});
}

  ngOnInit() {
  	this.loadAPI.then((dd)=>{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos)=>{
				this.initMap(pos);
			});
		} else {
			console.log('net');
		}
	});
  }

	loadScript(){
	console.log('loading..');
		let node = document.createElement('script');
		node.src = this.url;
		node.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(node);
	}


public initMap(pos): void{
	console.log('initMap');
	let mapmy = document.getElementById('map');
	let myCenter = new google.maps.LatLng( pos.coords.latitude, pos.coords.longitude );
	let myOptions = {
		center: myCenter,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	this.map = new google.maps.Map(mapmy, myOptions);


  this.placesService.google = google;
  this.placesService.map = this.map;
  this.placesService.mapReadyUpload.next(true);
	let marker = new google.maps.Marker({
		position: {lat:pos.coords.latitude, lng:pos.coords.longitude },
		map: this.map,
		title: 'Hello World!'
	});


	// this.map.addListener('rightclick',(e)=>{
	// 	this.rightClickOnMap(e);
	// });
	this.map.addListener('click',(e)=>{
		if (e.placeId) {
      console.log("e");
			console.log(e);
			e.stop();
			// e.prevent
			this.addMarker(e);
			// this.getDetailsMarker(e);
		}
		// this.contextMenuOf();
	});
	// this.map.addListener('center_changed', (e)=> {
	// 	this.contextMenuOf();
	// });

}




addMarker(e){
  console.log("addMarker");
  let coords = this.coords;
  if (e.placeId) {
    coords = e.latLng;
    this.getDetailsMarker(e);
  }
  let marker = new google.maps.Marker({
    position: coords,
    map: this.map
  });

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








getDetailsMarker(e){
  console.log('getDetailsMarker');
  // console.log(e);
  var service = new google.maps.places.PlacesService(this.map);

  service.getDetails({placeId: e.placeId}, (place, status) =>{
    let name = place.name || "";
    let address = place.formatted_address || "";
    let photo =  (place.photos) ? place.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}) : "";
    this.placesService.addPlaces({id:1, name:address});
    console.log(place);
// console.log(this.map.getCenter());
// this.getNearPlaces();
    this.zone.run(() => {
      this.router.navigate(['/places', e.placeId])
    });

  });
}



 getNearPlaces(types='store'){
  let request = {
    location: this.map.getCenter(),
    radius: ' 1000',
    types: [types]
  };

   let service = new google.maps.places.PlacesService(this.map);
   service.nearbySearch(request, (results, status)=>{
       if (status == google.maps.places.PlacesServiceStatus.OK) {
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
        var marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location
        });
}





contextMenuOn(x, y){
	let menu = <HTMLElement>document.getElementsByClassName("context-menu")[0];
	console.log(menu);

	menu.style.top = y + "px";
	menu.style.left = x + "px";
	menu.style.display = 'block';
	}

	contextMenuOf(){
	let menu = <HTMLElement>document.getElementsByClassName("context-menu")[0];
	menu.style.display = 'none';
	}

}
