import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';

const placeRoutes: Routes = [
  { path: 'places', component: PlacesComponent, pathMatch: 'full'},
  { path: 'places/:placeId', component: PlaceDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(placeRoutes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
