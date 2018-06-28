import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PlacesService, Places } from '../places/places.service';
import { NewsService, NEWS } from './news.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    private subscriptionMap: Subscription;
    private subscriptionNews: Subscription;
    public indexSelectedMarker: any;
    private today = new Date(Date.now());
    private newsArr: NEWS[] = [];

    constructor(private placesService: PlacesService,
        private newsService: NewsService,
        private cdRef: ChangeDetectorRef,
        private router: Router) { }

    ngOnInit() {
        this.subscriptionMap = this.placesService.mapReady
            .subscribe(
                (mission) => {
                    if (mission === true) {
                        this.placesService.preventLeftclick = true;
                        this.placesService.deleteMarkers();
                        this.getNews();
                    }
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

    mouseHover(news) {
        news.marker.setAnimation(this.placesService.google.maps.Animation.BOUNCE);
    }

    mouseLeave(news) {
        news.marker.setAnimation(null);
    }

    OnDestroy(): void {
        this.placesService.preventLeftclick = false;
        for (let i = this.placesService.markers.length - 1; i >= 0; i--) {
            // google.maps.event.clearInstanceListeners(this.placesService.markers[i]);
            this.placesService.google.maps.event.clearListeners(this.placesService.markers[i], 'mouseover');
            this.placesService.google.maps.event.clearListeners(this.placesService.markers[i], 'mouseout');
        }
    }

    bclick() {
        console.log(this.indexSelectedMarker);
        console.log(this.placesService.markers.length);
    }




}
