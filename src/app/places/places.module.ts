import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { PlacesComponent } from './places.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesService } from './places.service';
import { SliderComponent } from './place-details/slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlacesRoutingModule
  ],
  declarations: [
    PlaceDetailsComponent,
    PlacesComponent,
    SliderComponent
  ],
  providers: [ PlacesService ]
})
export class PlacesModule { }
