import { Component, OnInit } from '@angular/core';
import { PlacesService, Places }  from '../../places/places.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'app-create-news',
    templateUrl: './create-news.component.html',
    styleUrls: ['./create-news.component.css']
})

export class CreateNewsComponent implements OnInit {
    private subscriptionMap: Subscription;
    public adressPlace: any;

    constructor(private placesService:PlacesService) { }

    ngOnInit() {

        this.subscriptionMap = this.placesService.mapReady
        .subscribe(
            (mission) => {
                if(mission == true){
                    this.placesService.map.addListener('click',(e)=>{
                        if (!e.placeId) {
                           console.log("NEEEETY ID");
                        }

                        let geocoder = new this.placesService.google.maps.Geocoder;

        // geocoder.geocode({'location': e.latLng}, function(results, status) {
        //     if (status === 'OK') {
        //         if (results[0]) {
        //             console.log(results[0].formatted_address);
        //             this.adressPlace = results[0].formatted_address;
        //             console.log(this.adressPlace);
        //         }
        //     }
        // });


this.wwww(e);
                        // geocoder.geocode({'location': e.latLng}, function(results, status) {
                        //     if (status === 'OK') {
                        //         if (results[0]) {
                        //             console.log(results[0].formatted_address);
                        //             this.adressPlace = results[0].formatted_address;
                        //             console.log(this.adressPlace);
                        //         }
                        //     }
                        // });
                    });

                }
            });


    }




    wwww(e){
        let geocoder = new this.placesService.google.maps.Geocoder;
        // return function() {

        // }
        geocoder.geocode({'location': e.latLng}, function(results, status) {
            if (status === 'OK') {
                // if (results[0]) {
                //     console.log(results[0].formatted_address);
                    console.log(this);
                    console.log(results);
                    console.log(status);
                //     this.adressPlace = results[0].formatted_address;
                //     console.log(this.adressPlace);
                // }
            }
        });


    }



    ewclick(){
        console.log(this.adressPlace);
    }


}
