import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlacesService, Places }  from '../places/places.service';
import { Router }  from '@angular/router';
import { LoadMapService }  from './load-map.service';
import 'rxjs/add/operator/toPromise';
declare var google : any;

@Component({
	selector: 'app-main-map',
	templateUrl: './main-map.component.html',
	styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
	private rightClickOnMarker;

	constructor(public router:Router,
		public placesService:PlacesService,
		private zone: NgZone,
		public LoadMapService: LoadMapService) {

	}

	ngOnInit() {
		this.LoadMapService.load().then((dd)=>{
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos)=>{
					this.initMap(pos);
				});
			} else {
				console.log('net');
			}
		});

		this.rightClickOnMarker = this.placesService.emitRightClickOnMarker.subscribe({
            next: (e) => {
                console.log(e);
                console.log(e.Ia.view);
                // e.Ia.view.stop();

                this.contextMenuOn(e.Ia.pageX, e.Ia.pageY);
            }
        })

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
		this.placesService.map = new google.maps.Map(mapmy, myOptions);
		this.placesService.google = google;
		this.placesService.mapReady.next(true);

		let marker = new google.maps.Marker({
			position: {lat:pos.coords.latitude, lng:pos.coords.longitude },
			map: this.placesService.map,
			title: 'Hello World!'
		});

		this.placesService.map.addListener('click',(e)=>{
			if (e.placeId) {
				e.stop();
				this.placesService.deleteMarkers();
				this.placesService.addMarker(e);
				this.zone.run(() => {
					this.router.navigate(['/places', e.placeId])
				});
			}
			// this.contextMenuOf();
		});




		// this.map.addListener('center_changed', (e)=> {
		// 	this.contextMenuOf();
		// });
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
