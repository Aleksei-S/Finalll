import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthGuard } from './routing/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtInterceptorProvider } from './routing/jwt.interceptor';
import { LoadMapService } from './main-map/load-map.service';
import { LoginModule } from './login/login.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainMapComponent } from './main-map/main-map.component';
import { NewsModule } from './news/news.module';
import { NgModule } from '@angular/core';
import { PlacesModule } from './places/places.module';

@NgModule({
  declarations: [
    AppComponent,
    MainMapComponent,
    MainHeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    LoginModule,
    NewsModule,
    PlacesModule
  ],
  providers: [
    AuthGuard,
    JwtInterceptorProvider,
    LoadMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
