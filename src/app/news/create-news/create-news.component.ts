import { Component, OnInit, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { PlacesService, Places }  from '../../places/places.service';
import { NewsService, NEWS }  from '../news.service';


const now = new Date(Date.now()).toISOString();

@Component({
    selector: 'app-create-news',
    templateUrl: './create-news.component.html',
    styleUrls: ['./create-news.component.css']
})

export class CreateNewsComponent implements OnInit {
    private subscriptionMap: Subscription;
    public adressPlace: any;
    private listenerClick:  any;
	public news: NEWS = new NEWS ('', now, '', {}, '');

    constructor(private placesService:PlacesService,
    	private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
    	console.log(now);
        this.subscriptionMap = this.placesService.mapReady
        .subscribe((mission) => {
                if(mission == true){
                    this.listenerClick = this.placesService.map.addListener('click',(e)=>{
                        let geocoder = new this.placesService.google.maps.Geocoder;
				        geocoder.geocode({'location': e.latLng}, (results, status) => {
				            if (status === 'OK') {
				                if (results[0]) {
				                	if (!e.placeId) {
				                       	this.placesService.deleteMarkers();
				                        this.placesService.addMarker(results[0]); 
									}
				                    this.adressPlace = results[0].formatted_address;
				                    this.cdRef.detectChanges();
				                }
				            }
				        });

                    });

                }
        });
    }


ngOnDestroy() {
   this.placesService.google.maps.event.removeListener(this.listenerClick);
}




    ewclick(){
        console.log(this.news);
        console.log(now);
    }


}
