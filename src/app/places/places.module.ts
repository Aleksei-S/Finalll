import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlacesComponent } from './places.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesService } from './places.service';
import { PlaceDetailsComponent } from './place-details/place-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlacesRoutingModule
  ],
  declarations: [ PlacesComponent, PlaceDetailsComponent ],
  providers: [ PlacesService ]
})
export class PlacesModule { }
