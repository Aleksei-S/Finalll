import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlacesService, Places }  from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places$: Observable<Places[]>;
  private selectedId: number;


  constructor(
      private service:PlacesService
    ) { }

  ngOnInit() {
    this.places$ = this.service.getPlaces();
  }

  bclick(){
    console.log(this.selectedId);
  }

}
