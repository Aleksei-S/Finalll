import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { PlacesService, Places }  from './places.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  private places$: Observable<Places[]>;
  private selectedId: number;
private subscription: Subscription;

private clickCount:number=0;


  constructor(private placesService:PlacesService, private zone: NgZone) {
this.placesService.onClick.subscribe(cnt=>{

    console.log('constructor   .placesService.onClick.subscribe');
    this.clickCount = cnt;
// this.zone.run(() => {
     
//     });



});


  }

  ngOnInit() {




    // this.places$ = this.service.getPlaces();
//         this.subscription = this.placesService.missionAnnounced$.subscribe(
//       mission => {
//         console.log(mission);
// this.ssss= mission;
//     });
  }

  bclick(){
    // console.log(this.placesService.places$);
    console.log(this.clickCount);
    console.log(this);
  }

}
