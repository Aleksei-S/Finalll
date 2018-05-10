import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places.component';

const placeRoutes: Routes = [
  { path: 'places', component: PlacesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(placeRoutes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
