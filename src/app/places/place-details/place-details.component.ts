import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PlacesService, Places } from '../places.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
declare var google: any;


@Component({
    selector: 'app-place-details',
    templateUrl: './place-details.component.html',
    styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
    private subscriptionMap: Subscription;
    private subscriptionPlace: Subscription;
    public placeId: any;
    public placeDetail: any;

    constructor(private placesService: PlacesService,
        private activatedRoute: ActivatedRoute,
        private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        // console.log( "PLACE DEATAILSS");
        this.subscriptionPlace = this.placesService.currentPlace$.subscribe((u) => {
            this.placeDetail = u;
            this.cdRef.detectChanges();
        });

        this.subscriptionMap = this.placesService.mapReady
            .subscribe((mission) => {
                if (mission === true) {
                    // console.log("mapReadymapReadymapReady");
                    this.activatedRoute.params.subscribe((u) => {
                        // console.log(u);
                        this.placesService.getDetails(u.placeId);
                    });
                }
            });
    }

    OnDestroy() {
        this.subscriptionPlace.unsubscribe();
    }

    bclick() {
        // console.log(this.placesService.currentPlace$);
        console.log(this.placeDetail.photoUrlarr);
    }
}
