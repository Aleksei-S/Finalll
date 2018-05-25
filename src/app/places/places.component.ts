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

  private places$: any;
  private selectedId: number;
  private subscription: Subscription;
  private clickCount:number=0;


  constructor(private placesService:PlacesService, private zone: NgZone, private router: Router) {
    console.log('constructor  component');


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

 // this.places$ = this.placesService.getPlaces();



this.subscription = this.placesService.places$.subscribe(
      (mission) => {
        console.log(mission);
        this.places$ = mission;
    });


    // this.places$ = this.service.getPlaces();
//         this.subscription = this.placesService.missionAnnounced$.subscribe(
//       mission => {
//         console.log(mission);
// this.ssss= mission;
//     });
  }

  bclick(){
    // console.log(this.places$);
    // console.log(this.clickCount);
    // console.log(this);
    console.log(this.placesService.map);
    this.placesService.doClick();
  }

}
