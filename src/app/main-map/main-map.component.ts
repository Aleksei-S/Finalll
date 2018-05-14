import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
declare var google : any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
public map: any;
// public google : any;

private url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_314OxmWH6Shuz2aBlL90oP3ObvOapMQ&libraries=places&callback=__onGoogleLoaded";
private loadAPI: Promise<any>

  constructor() { 
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
	let marker = new google.maps.Marker({
		position: {lat:pos.coords.latitude, lng:pos.coords.longitude },
		map: this.map,
		title: 'Hello World!'
	});


	// this.map.addListener('rightclick',(e)=>{
	// 	this.rightClickOnMap(e);
	// });
	// this.map.addListener('click',(e)=>{
	// 	if (e.placeId) {
 //      console.log("e");
	// 		console.log(e);
	// 		e.stop();
	// 		// e.prevent
	// 		this.addMarker(e);
	// 		// this.getDetailsMarker(e);
	// 	}
	// 	this.contextMenuOf();
	// });
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
