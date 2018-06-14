import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlacesService, Places }  from '../places/places.service';
import { Router }  from '@angular/router';
import { LoadMapService }  from './load-map.service';
import { Subscription } from "rxjs/Subscription";
import { Subject }    from 'rxjs/Subject'
import 'rxjs/add/operator/toPromise';
declare var google : any;

@Component({
    selector: 'app-main-map',
    templateUrl: './main-map.component.html',
    styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

    private rightClickOnMarker;
    private contextMenu : boolean = false;
    private placeForContextMenu: any;
    private curentPlaceId: string;
    // private placeForContextMenu = new Subject<any>();

    constructor(public router:Router,
        public placesService:PlacesService,
        private zone: NgZone,
        public LoadMapService: LoadMapService) {}

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
            next: (arg) => {
                this.contextMenuOn(arg.event.Ha.pageX, arg.event.Ha.pageY);
                // console.log(arg.placeId);
                this.curentPlaceId = arg.placeId;
                this.placeForContextMenu = arg.marker;
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
            title: 'Hello World!',
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });

        this.placesService.map.addListener('click',(e)=>{
            if (e.placeId) {
                e.stop();
                this.placesService.deleteMarkers();
                this.placesService.addMarker(e);
            }
            this.contextMenu ? this.contextMenuOf() : "" ;
        });



        this.placesService.map.addListener('center_changed', (e)=> {
            this.contextMenu ? this.contextMenuOf() : "" ;
        });
    }

    CreateNews(e){
		// let currentPlace;
		// let indexPlace : number;
  //       if (this.placesService.listPlaces.length == 0) {
  //       	currentPlace = this.placesService.currentPlace$.getValue();
  //       } else {
  //       	for (var i = this.placesService.markers.length - 1; i >= 0; i--) {
  //       		(this.placesService.markers[i] == this.placeForContextMenu) ? indexPlace = i : "";
  //       	}
  //       	currentPlace = this.placesService.listPlaces[indexPlace];
  //       }
		// currentPlace

        this.contextMenuOf();
    }



    goToDetails(){
        this.zone.run(() => {
            this.router.navigate(['/places', this.curentPlaceId])
        });
        this.contextMenuOf();
    }









    contextMenuOn(x, y){
        let menu = <HTMLElement>document.getElementsByClassName("context-menu")[0];
        menu.style.top = y + "px";
        menu.style.left = x + "px";
        menu.style.display = 'block';
        menu.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        this.contextMenu = true
    }

    contextMenuOf(){
        let menu = <HTMLElement>document.getElementsByClassName("context-menu")[0];
        menu.style.display = 'none';
    }

}
