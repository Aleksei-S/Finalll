import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NewsService, NEWS } from './news.service';
import { PlacesService, Places } from '../places/places.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  private newsArr: NEWS[] = [];
  private subscriptionMap: Subscription;
  private subscriptionNews: Subscription;
  private today = new Date(Date.now());
  public indexSelectedMarker: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private newsService: NewsService,
    private router: Router,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.subscriptionMap = this.placesService.mapReady
      .subscribe(
        (mission) => {
          if (mission === true) {
            this.placesService.deleteMarkers();
            this.getNews();
          }
        });
        this.placesService.preventLeftclick = true;
  }

  selectChange(e) {
    console.log('selectChange');
    if (e === 'По дате создания события') {
      this.newsArr.sort(function(a, b) {
          return (new Date(a.createDate)).getTime() - (new Date(b.createDate)).getTime();
        });

    }

    if (e === 'По дате начала события') {
      this.newsArr.sort(function(a, b) {
          return (new Date(a.dateTimeEvent)).getTime() - (new Date(b.dateTimeEvent)).getTime();
        });
    }

  }













  addListenerOnMarker(marker, i) {
    this.placesService.google.maps.event.addListener(marker, 'mouseover', () => {
      this.indexSelectedMarker = i;
      this.cdRef.detectChanges();
    });

    this.placesService.google.maps.event.addListener(marker, 'mouseout', () => {
      this.indexSelectedMarker = undefined;
      this.cdRef.detectChanges();
    });
  }

  getNews(): void {
    this.newsService.getNews().subscribe(
      (data) => {
        this.newsArr = data.data;
        for (let i = this.newsArr.length - 1; i >= 0; i--) {
          this.newsArr[i].marker = this.placesService.addMarker(this.newsArr[i]);
          this.addListenerOnMarker(this.newsArr[i].marker, i);
        }
        console.log(this.newsArr);
      },
      (err) => { console.log(err); },
      () => {
        console.log('done loading news');
      }
    );
  }

  mouseHover(news) {
    news.marker.setAnimation(this.placesService.google.maps.Animation.BOUNCE);
  }

  mouseLeave(news) {
    news.marker.setAnimation(null);
  }

  ngOnDestroy(): void {
    this.placesService.preventLeftclick = false;
    for (let i = this.placesService.markers.length - 1; i >= 0; i--) {
      // google.maps.event.clearInstanceListeners(this.placesService.markers[i]);
      this.placesService.google.maps.event.clearListeners(this.placesService.markers[i], 'mouseover');
      this.placesService.google.maps.event.clearListeners(this.placesService.markers[i], 'mouseout');
    }
  }

  bclick() {
    console.log(this.newsArr);
    // numbers.sort(function(a, b) {
    //   return a - b;
    // });

  }







}
