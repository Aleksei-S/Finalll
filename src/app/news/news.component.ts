import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
            	this.placesService.map.addListener('click',(e)=>{
            		e.stop();
            		console.log(e);	
            		e.Ha.preventDefault();
            	console.log('NEWS MAP click');	

        		});
               
        }
    });
  }



bclick(){

}




}
