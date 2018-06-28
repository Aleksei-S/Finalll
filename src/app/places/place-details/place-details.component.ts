import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlacesService, Places } from '../places.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { switchMap } from 'rxjs/operators';
declare var google: any;


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  private subscriptionMap: Subscription;
  private subscriptionPlace: Subscription;
  public placeDetail: any;
  public placeId: any;

  constructor(
    private placesService: PlacesService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscriptionPlace = this.placesService.currentPlace$.subscribe((u) => {
      this.placeDetail = u;
      this.cdRef.detectChanges();
    });

    this.subscriptionMap = this.placesService.mapReady
      .subscribe((mission) => {
        if (mission === true) {
          // console.log("mapReadymapReadymapReady");
          this.activatedRoute.params.subscribe((u) => {
            this.placesService.getDetails(u.placeId);
          });
        }
      });
  }

  OnDestroy() {
    this.subscriptionPlace.unsubscribe();
  }

  bclick() {
    console.log(this.placeDetail.photoUrlarr);
  }
}
