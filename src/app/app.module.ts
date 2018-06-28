import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// component
import { AppComponent } from './app.component';
import { MainMapComponent } from './main-map/main-map.component';
import { MainHeaderComponent } from './main-header/main-header.component';
// Module
import { AppRoutingModule } from './routing/app-routing.module';
import { PlacesModule } from './places/places.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { NewsModule } from './news/news.module';

import { LoadMapService } from './main-map/load-map.service';
import { AuthGuard } from './routing/auth.guard';
import { JwtInterceptorProvider } from './routing/jwt.interceptor';

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
    providers: [LoadMapService, JwtInterceptorProvider, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
