import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { PlacesModule } from './places/places.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MainMapComponent } from './main-map/main-map.component';
//https://stackblitz.com/angular/omplpnlkrdx?file=src%2Fapp%2Fcrisis-center%2Fcrisis.service.ts

@NgModule({
  declarations: [
    AppComponent,
    MainMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PlacesModule,
    LoginModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
