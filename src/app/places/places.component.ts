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
export class PlacesComponent implements OnInit {

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
  ) {}

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
              searchBox.setBounds(this.placesService.map.getBounds());
            });
            searchBox.addListener('places_changed', () => {
              // console.log('places_changed');
              const places = searchBox.getPlaces();
              this.places$.next(places);
              this.placesService.listPlaces = places;

              // console.log(places);
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
            });
          }
        });
  }


  addListenerOnMarker() {
    let marker;
    let indexPlace;
    for (let i = this.placesService.markers.length - 1; i >= 0; i--) {
      marker = this.placesService.markers[i];
      google.maps.event.addListener(marker, 'mouseover', (function (thisComponent) {
        return function () {
          for (let n = thisComponent.placesService.markers.length - 1; n >= 0; n--) {
            (thisComponent.placesService.markers[n] === this) ? indexPlace = n : n = n;
          }
          thisComponent.indexSelectedMarker = indexPlace;
          thisComponent.cdRef.detectChanges();
        };
      })(this));

      google.maps.event.addListener(marker, 'mouseout', () => {
        this.indexSelectedMarker = undefined;
        this.cdRef.detectChanges();
      });
    }
  }

  clickOnPlace(index, pl) {
    this.zone.run(() => {
      this.router.navigate(['/places', pl.place_id]);
    });
  }

  mouseHover(index, pl) {
    const curentMarker = this.placesService.markers[index];
    curentMarker.setAnimation(google.maps.Animation.BOUNCE);
  }

  mouseLeave(index, pl) {
    this.placesService.markers[index].setAnimation(null);
  }

  OnDestroy() {
    google.maps.event.clearListeners(this.placesService.map, 'bounds_changed');
    for (let i = this.placesService.markers.length - 1; i >= 0; i--) {
      google.maps.event.clearListeners(this.placesService.markers[i], 'mouseover');
      google.maps.event.clearListeners(this.placesService.markers[i], 'mouseout');
    }
  }

  filterSearcPlace(type) {
    // var request = {
    //     location: pyrmont,
    //     radius: '500',
    //     type: ['restaurant']
    //   };

    //   service = new google.maps.places.PlacesService(map);
    //   service.nearbySearch(request, callback);
    // }

    // function callback(results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       var place = results[i];
    //       createMarker(results[i]);
    //     }
    //   }
    // }
  }

}
