import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PlacesService, Places }  from '../places.service';
import { switchMap } from 'rxjs/operators';
import { Subscription }   from 'rxjs';
import { Observable } from 'rxjs/Observable';
declare var google : any;


@Component({
	selector: 'app-place-details',
	templateUrl: './place-details.component.html',
	styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
	private subscriptionMap: Subscription;
	private subscriptionPlace: Subscription;
	public placeId:any;
	public placeDetail:any;

	constructor(private placesService:PlacesService,
				private activatedRoute:ActivatedRoute,
				private cdRef: ChangeDetectorRef) { }

	ngOnInit() {
		// console.log( "PLACE DEATAILSS");
		this.subscriptionPlace = this.placesService.currentPlace$.subscribe((u) => {
			// console.log(u);
			this.placeDetail = u;
			this.cdRef.detectChanges();
		});


		this.subscriptionMap = this.placesService.mapReady
		.subscribe( (mission) => {
			if(mission == true){
				// console.log("mapReadymapReadymapReady");
				this.activatedRoute.params.subscribe((u) => {
					// console.log(u);
					this.placesService.getDetails(u.placeId);

				});
			}
		});



// Observable.forkJoin(this.activatedRoute.params, this.placesService.mapReady).subscribe(res => console.log(res))

 // this.hero$ = this.activatedRoute.paramMap.pipe(
 //    switchMap((params: ParamMap) =>{})

 //      // this.service.getHero(params.get('id')))
 //  );

	// this.placesService.getDetails(e)
}






ngOnDestroy(){
	this.subscriptionPlace.unsubscribe();
}





bclick(){

		 // console.log(this.placesService.currentPlace$);
		 console.log(this.placeDetail.photoUrlarr);
         // console.log(this.placesService.listPlaces);
         // console.log(this.placesService.currentPlace$.getValue());
		}






	}
