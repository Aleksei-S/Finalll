import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { PlacesService, Places }  from '../places/places.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private subscriptionMap: Subscription;

  constructor(private placesService:PlacesService) { }

  ngOnInit() {
  	console.log('OnInit!!!!!  NEWS NEWS NEWS');
    this.subscriptionMap = this.placesService.mapReady
    .subscribe(
      (mission) => {
        if(mission == true){
          console.log('NEWS NEWS MAP READY');
        }
      });
  }



  bclick(){

  }




}
