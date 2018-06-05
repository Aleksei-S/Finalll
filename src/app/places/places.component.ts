import { Component, OnInit, NgZone, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { PlacesService, Places }  from './places.service';
import { Subscription }   from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import { Router, NavigationStart }  from '@angular/router';
import { LoadMapService }  from '../main-map/load-map.service';
import 'rxjs/add/observable/fromEvent';
import {zip} from "rxjs/observable/zip";
import 'rxjs/add/observable/throw';
declare var google : any;

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {


    private places$ = new  BehaviorSubject <any[]>([]);
    private subscriptionPlaces$ = this.places$.asObservable();
    public places: any[];
    private subscriptionMap: Subscription;
    private showAddcomments:false;
    private map:any;



constructor(
    private placesService:PlacesService,
    private zone: NgZone,
    private router: Router,
    private LoadMapService:LoadMapService,
    private cdRef: ChangeDetectorRef) {
}

ngOnInit() {
    console.log('OnInit!!!!!  component');

if (this.placesService.listPlaces.length != 0) {
    this.places$.next(this.placesService.listPlaces);
}

    this.subscriptionPlaces$.subscribe((e)=>{
        this.places = e;
        this.placesService.deleteMarkers();
        this.places.forEach((pl)=> {
            if (!pl.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
                this.placesService.addMarker(pl);
            });
        this.cdRef.detectChanges();
    });


    this.subscriptionMap = this.placesService.mapReady
    .subscribe(
        (mission) => {
            if(mission == true){

                console.log('LoadMapService LoadMapService');
                let input = document.getElementById('searchBox');
                let searchBox = new google.maps.places.SearchBox(input);
                console.log(this.placesService);
            // this.placesService.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(output);
            searchBox.setBounds(this.placesService.map.getBounds());
            this.placesService.map.addListener('bounds_changed', () =>{
                searchBox.setBounds(this.placesService.map.getBounds());
            });
            searchBox.addListener('places_changed', () =>{
                let places = searchBox.getPlaces();
                this.places$.next(places);
                this.placesService.listPlaces = places;


                console.log(places);
                if (places.length == 0) {
                    return;
                }

                var bounds = new google.maps.LatLngBounds();

                places.forEach((place)=> {

                     //смещение карты
                     if (place.geometry.viewport) {
                         bounds.union(place.geometry.viewport);
                     } else {
                         bounds.extend(place.geometry.location);
                     }
                 });
                this.placesService.map.fitBounds(bounds);
            });


        }




    });







}

// initComponent(){
//         this.placesService.deleteMarkers();
//         this.placesService.listPlaces.forEach((pl)=> {
//             if (!pl.geometry) {
//                 console.log("Returned place contains no geometry");
//                 return;
//             }
//                 this.placesService.addMarker(pl);
//             });
//         this.cdRef.detectChanges();
// }


clickOnPlace(index, pl){
     this.zone.run(() => {
        this.router.navigate(['/places', pl.place_id]);
     });
}

mouseHover(index, pl){
    let curentMarker = this.placesService.markers[index];
    curentMarker.setAnimation(google.maps.Animation.BOUNCE);
}

mouseLeave(index, pl){
    this.placesService.markers[index].setAnimation(null);
}


ngOnDestroy(){
    google.maps.event.clearListeners(this.placesService.map, 'bounds_changed');
}



     bclick(){

         // console.log(this.placesService.currentPlace$);
         // console.log(this.placesService.markers);
         console.log(this.placesService.listPlaces);
     }

 }
