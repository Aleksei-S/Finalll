import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadMapService } from '../main-map/load-map.service';
import { PlacesService, Places } from './places.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/throw';
declare var google: any;


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, OnDestroy {

  private map: any;
  private places$ = new BehaviorSubject<any[]>([]);
  private showAddcomments = false;
  private subscriptionMap: Subscription;
  private subscriptionPlaces$ = this.places$.asObservable();
  public indexSelectedMarker: any;
  public places: any[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private loadMapService: LoadMapService,
    private placesService: PlacesService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
    // console.log('OnInit!!!!!  component');
    if (this.placesService.listPlaces.length !== 0) {
      this.places$.next(this.placesService.listPlaces);
    }

    this.subscriptionPlaces$.subscribe((e) => {
      this.places = e;
      this.placesService.deleteMarkers();
      this.places.forEach((pl) => {
        if (!pl.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }
        this.placesService.addMarker(pl);
      });
      //////////////// marker event mouseover and mouseout////////////////
      this.addListenerOnMarker();
      this.cdRef.detectChanges();
    });


    this.subscriptionMap = this.placesService.mapReady
      .subscribe(
        (mission) => {
          if (mission === true) {
            const input = document.getElementById('searchBox');
            const searchBox = new google.maps.places.SearchBox(input);
            searchBox.setBounds(this.placesService.map.getBounds());

            this.placesService.map.addListener('bounds_changed', () => {
              console.log('bounds_changed');
              searchBox.setBounds(this.placesService.map.getBounds());
            });

            searchBox.addListener('places_changed', () => {
              console.log('places_changed');
              const places = searchBox.getPlaces();
              this.setPlace(places);
            });
          }
        });
  }

  setPlace(places) {
    console.log(places);
    this.places$.next(places);
    this.placesService.listPlaces = places;
    if (places.length === 0) {
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      // смещение карты
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.placesService.map.fitBounds(bounds);
  }


  addListenerOnMarker() {
    let marker;
    for (let i = this.placesService.markers.length - 1; i >= 0; i--) {
      marker = this.placesService.markers[i];
      google.maps.event.addListener(marker, 'mouseover', this.markerMouseover.bind(this, marker));


      google.maps.event.addListener(marker, 'mouseout', () => {
        this.indexSelectedMarker = undefined;
        this.cdRef.detectChanges();
      });
    }
  }

  markerMouseover(marker) {
    // console.log('markerMouseover');
    let indexPlace: any;
    for (let n = this.placesService.markers.length - 1; n >= 0; n--) {
      (this.placesService.markers[n] === marker) ? indexPlace = n : n = n;
    }
    this.indexSelectedMarker = indexPlace;
    this.cdRef.detectChanges();
  }

  clickOnPlace(index, pl) {
    this.zone.run(() => {
      this.router.navigate(['/places', pl.place_id]);
    });
  }

  mouseHover(index, pl) {
    // console.log('mouseHover');
    const curentMarker = this.placesService.markers[index];
    curentMarker.setAnimation(google.maps.Animation.BOUNCE);
  }

  mouseLeave(index, pl) {
    // console.log('mouseLeave');
    this.placesService.markers[index].setAnimation(null);
  }

  ngOnDestroy() {
    // console.log('OnDestroy');
    google.maps.event.clearListeners(this.placesService.map, 'bounds_changed');
    for (let i = this.placesService.markers.length - 1; i >= 0; i--) {
      google.maps.event.clearListeners(this.placesService.markers[i], 'mouseover');
      google.maps.event.clearListeners(this.placesService.markers[i], 'mouseout');
    }
  }


  filterSearcPlace(type) {
    const request = {
      location: this.placesService.map.getCenter(),
      radius: '20',
      query: type
    };
    const service = new google.maps.places.PlacesService(this.placesService.map);
    service.textSearch(request, (pl) => {
      this.setPlace(pl);
    });
  }

}
