import { AuthGuard } from '../routing/auth.guard';
import { NgModule } from '@angular/core';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { PlacesComponent } from './places.component';
import { Routes, RouterModule } from '@angular/router';

const placeRoutes: Routes = [
    { path: 'places', component: PlacesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'places/:placeId', component: PlaceDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(placeRoutes)],
    exports: [RouterModule]
})
export class PlacesRoutingModule { }
