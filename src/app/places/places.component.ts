import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { PlacesService, Places }  from './places.service';
import { Subscription }   from 'rxjs';
import { Router, NavigationStart }  from '@angular/router';
import {zip} from "rxjs/observable/zip";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  private places$: any[];
  private selectedId: number;
  private subscription: Subscription;
  private Obs: Observable<any>; 
  private subscription1: Subscription;
  private clickCount:number=0;


  constructor(private placesService:PlacesService, private zone: NgZone, private router: Router) {
    console.log('constructor  component');
  }

  ngOnInit() {

    console.log('OnInit  component');

// Observable
//     .zip(name$, document$, (name: string, document: string) => ({name, document}))
//     .subscribe(pair => {
//            this.name = pair.name;
//            this.document = pair.document;
//            this.showForm();
//        })
// this.placesService.doClick();

// this.subscription = this.placesService.places$
// .subscribe(
//   (mission) => {
//     this.zone.run(()=>{
//       this.places$ = mission;
//     });
//   });


}

bclick(){
  // console.log(this.places$);
 console.log(this.placesService.currentPlace$);
}

}
