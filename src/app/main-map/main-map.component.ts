import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { LoadMapService } from './load-map.service';
import { PlacesService, Places } from '../places/places.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
declare var google: any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  private contextMenu = false;
  private curentPlaceId: string;
  private placeForContextMenu: any;
  private rightClickOnMarker;

  constructor(
    private zone: NgZone,
    public loadMapService: LoadMapService,
    public placesService: PlacesService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loadMapService.load().then((dd) => {
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition((pos) => {
          this.initMap();
      //   });
      // } else {
      //   console.log('net');
      // }
    });
    this.rightClickOnMarker = this.placesService.emitRightClickOnMarker.subscribe({
      next: (arg) => {
        this.contextMenuOn(arg.event.Ha.pageX, arg.event.Ha.pageY);
        // console.log(arg.placeId);
        this.curentPlaceId = arg.placeId;
        this.placeForContextMenu = arg.marker;
      }
    });
  }

  public initMap(): void {
    console.log('initMap');
    const mapmy = document.getElementById('map');
    const myCenter = new google.maps.LatLng('52.09755', '23.68775');
    const myOptions = {
      center: myCenter,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.placesService.map = new google.maps.Map(mapmy, myOptions);
    this.placesService.google = google;
    this.placesService.mapReady.next(true);

    // const marker = new google.maps.Marker({
    //   position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
    //   map: this.placesService.map,
    //   title: 'Hello World!',
    //   icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    // });

    this.placesService.map.addListener('click', (e) => {
      console.log('click');
      if (e.placeId) {
        e.stop();
        if (this.placesService.preventLeftclick) {
          return false;
        }
        this.placesService.deleteMarkers();
        this.placesService.addMarker(e);
      }
      if (this.contextMenu) {
        this.contextMenuOf();
      }
    });

    this.placesService.map.addListener('center_changed', (e) => {
      if (this.contextMenu) {
        this.contextMenuOf();
      }
    });
  }

  CreateNews(e) {
    this.contextMenuOf();
  }

  contextMenuOn(x, y) {
    const menu = <HTMLElement>document.getElementsByClassName('context-menu')[0];
    menu.style.top = y + 'px';
    menu.style.left = x + 'px';
    menu.style.display = 'block';
    menu.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    this.contextMenu = true;
  }

  contextMenuOf() {
    const menu = <HTMLElement>document.getElementsByClassName('context-menu')[0];
    menu.style.display = 'none';
  }

  goToDetails() {
    this.zone.run(() => {
      this.router.navigate(['/places', this.curentPlaceId]);
    });
    this.contextMenuOf();
  }

}
