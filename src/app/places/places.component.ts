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


    this.subscriptionPlaces$.subscribe((e)=>{
        this.places = e;
        this.cdRef.detectChanges();
    })


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


                console.log(places);
                if (places.length == 0) {
                    return;
                }

                var bounds = new google.maps.LatLngBounds();

                places.forEach((place)=> {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                     console.log(place);
                    //добавление маркеров
                    this.placesService.addMarker(place);
                    // //пуш place в массив
                    // this.places$.push(place);

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


            ngOnDestroy(){
                google.maps.event.clearListeners(this.placesService.map, 'bounds_changed');

            }







            valuechange(e){
            // console.log(this.places$);
            console.log(e);
         // this.placesService.getTextSearchPlaces(e.target.value);
     }


     bclick(){

         // console.log(this.placesService.currentPlace$);
         console.log(this.placesService.markers);
     }

 }
