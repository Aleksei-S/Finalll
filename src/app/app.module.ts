import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { PlacesModule } from './places/places.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { NewsModule } from './news/news.module';
import { MainMapComponent } from './main-map/main-map.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { LoadMapService } from './main-map/load-map.service';

import { AuthGuard } from './routing/auth.guard';

 import { JwtInterceptorProvider } from './routing/jwt.interceptor';

//https://stackblitz.com/angular/omplpnlkrdx?file=src%2Fapp%2Fcrisis-center%2Fcrisis.service.ts

@NgModule({
	declarations: [
		AppComponent,
		MainMapComponent,
		MainHeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		PlacesModule,
		LoginModule,
		HomeModule,
		NewsModule,
		HttpClientModule

	],
	providers: [LoadMapService, JwtInterceptorProvider, AuthGuard], //JwtInterceptorProvider
	bootstrap: [AppComponent]
})
export class AppModule { }
