import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { PlacesModule } from './places/places.module';

//https://stackblitz.com/angular/omplpnlkrdx?file=src%2Fapp%2Fcrisis-center%2Fcrisis.service.ts

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PlacesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
