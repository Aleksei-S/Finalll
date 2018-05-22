import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { PlacesService, Places }  from './places.service';
import { Subscription }   from 'rxjs';
import { Router, NavigationStart }  from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  private places$: Places[];
  private selectedId: number;
  private subscription: Subscription;
  private clickCount:number=0;


  constructor(private placesService:PlacesService, private zone: NgZone, private router: Router) {
    console.log('constructor  component');

    router.events.subscribe((e)=>{
      if (e instanceof NavigationStart) {
        console.log("NavigationStart");
        this.ngOnInit();
        this.zone.run(() => {});
      }
    });

//https://www.google.com/search?q=angular+router+navigate+not+ngoninit&spell=1&sa=X&ved=0ahUKEwjxj723zJjbAhWBbFAKHW2UCV4QBQgkKAA&biw=1191&bih=932
//https://angular.io/api/router/RouteReuseStrategy
//https://stackoverflow.com/questions/39533291/angular2-router-2-0-0-not-reloading-components-when-same-url-loaded-with-differe/39533351#39533351
    // this.placesService.onClick.subscribe(cnt=>{
    //   console.log('constructor   .placesService.onClick.subscribe');
    //   this.clickCount = cnt;
    //   // this.zone.run(() => {});
    // });


    //  this.placesService.name.subscribe(
    //   astronaut => {
    //     console.log('constructor   name.subscribe');
    //     this.places$ = astronaut;
    //     this.zone.run(() => {});
    //   });







  }

  ngOnInit() {

console.log('OnInit  component');

 this.places$ = this.placesService.getPlaces();


    // this.places$ = this.service.getPlaces();
//         this.subscription = this.placesService.missionAnnounced$.subscribe(
//       mission => {
//         console.log(mission);
// this.ssss= mission;
//     });
  }

  bclick(){
    console.log(this.places$);
    console.log(this.clickCount);
    console.log(this);
  }

}
