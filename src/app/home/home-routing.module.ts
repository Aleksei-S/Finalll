import { AuthGuard } from '../routing/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const homeRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] }];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
