import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PlacesService, Places }  from '../places.service';
import { switchMap } from 'rxjs/operators';
import { Subscription }   from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
private subscriptionMap: Subscription;
public placeDetails:any;
  constructor(private placesService:PlacesService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
 console.log( "PLACE DEATAILSS");
this.activatedRoute.params.subscribe((u) => {
      console.log(u);
this.placeDetails=u;
    });

  this.subscriptionMap = this.placesService.mapReady
    .subscribe( (mission) => {
    	if(mission == true){
    	console.log("mapReadymapReadymapReady");
    	this.placesService.getDetails(this.placeDetails.placeId);
            console.log("mapReadymapReadymapReady");
}
   });



// Observable.forkJoin(this.activatedRoute.params, this.placesService.mapReady).subscribe(res => console.log(res)) 

 // this.hero$ = this.activatedRoute.paramMap.pipe(
 //    switchMap((params: ParamMap) =>{})

 //      // this.service.getHero(params.get('id')))
 //  );

  	// this.placesService.getDetails(e)
  }


     bclick(){

         // console.log(this.placesService.currentPlace$);
         console.log(this.placesService);
     }



}
