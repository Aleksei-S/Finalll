import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { PlacesService, Places }  from './places.service';
import { Subscription }   from 'rxjs';
import { Router, NavigationStart }  from '@angular/router';
import { LoadMapService }  from '../main-map/load-map.service';
import {zip} from "rxjs/observable/zip";
declare var google : any;

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

    private places$: any[];
    private selectedId: number;
    private subscription: Subscription;
    private Obs: Observable<any>;
    private subscription1: Subscription;
    private clickCount:number=0;
    private showAddcomments:false;
    private map:any;
// private promise = new Promise<any>(this.placesService.google);

    constructor(
        private placesService:PlacesService,
        private zone: NgZone,
        private router: Router,
        private LoadMapService:LoadMapService) {
    }

 ngOnInit() {

        console.log('OnInit!!!!!  component');


        this.LoadMapService.load().then((dd)=>{
            this.map = this.placesService.map;
                console.log('LoadMapService LoadMapService LoadMapService');
                let input = document.getElementById('searchBox');
                let output = document.getElementById('searchBoxOutput');
                let map = document.getElementById('map');
                console.log(this.placesService.map);
                let searchBox = new google.maps.places.SearchBox(input);


                // map.addListener('bounds_changed', function() {
                //  console.log('window');
                // //   // searchBox.setBounds(map.getBounds());
                // });



                searchBox.addListener('places_changed', function() {
                    let places = searchBox.getPlaces();
                    console.log(places);
                    if (places.length == 0) {
                      return;
                    }


// var bounds = new google.maps.LatLngBounds();
                  places.forEach(function(place) {
                      console.log(place);
                    if (!place.geometry) {
                      console.log("Returned place contains no geometry");
                      return;
                    }

                    // Create a marker for each place.
                    // markers.push(new google.maps.Marker({
                    //   map: map,
                    //   icon: icon,
                    //   title: place.name,
                    //   position: place.geometry.location
                    // }));

                    // if (place.geometry.viewport) {
                    //   // Only geocodes have viewport.
                    //   bounds.union(place.geometry.viewport);
                    // } else {
                    //   bounds.extend(place.geometry.location);
                    // }
                  });



















                 });



                // // Bias the SearchBox results towards current map's viewport.
                // map.addListener('bounds_changed', function() {
                //   searchBox.setBounds(map.getBounds());
                // });
        });






// this.promise =
// Observable
//     .zip(name$, document$, (name: string, document: string) => ({name, document}))
//     .subscribe(pair => {
//            this.name = pair.name;
//            this.document = pair.document;
//            this.showForm();
//        })
// this.placesService.doClick();

// this.subscription = this.placesService.places$
// .subscribe(
//   (mission) => {
//     this.zone.run(()=>{
//       this.places$ = mission;
//     });
//   });


}









        valuechange(e){
            // console.log(this.places$);
         console.log(e);
         // this.placesService.getTextSearchPlaces(e.target.value);
        }


        bclick(){
            // console.log(this.places$);
         // console.log(this.placesService.currentPlace$);
         console.log(this.placesService.map);
        }

}
 // // Create the search box and link it to the UI element.
 //        var input = document.getElementById('pac-input');
 //        var searchBox = new google.maps.places.SearchBox(input);
 //        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

 //        // Bias the SearchBox results towards current map's viewport.
 //        map.addListener('bounds_changed', function() {
 //          searchBox.setBounds(map.getBounds());
 //        });
