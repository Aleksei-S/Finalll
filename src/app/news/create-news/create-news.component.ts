import { Component, OnInit, ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { NewsService, NEWS } from '../news.service';
import { PlacesService, Places } from '../../places/places.service';
import { Subscription } from 'rxjs/Subscription';
import { removeAllListeners } from 'cluster';


@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})

export class CreateNewsComponent implements OnInit, OnDestroy {
  private listenerClick: any;
  private subscriptionMap: Subscription;
  public dateNowISO: string;
  public newsForm: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private newsService: NewsService,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.dateNowISO = this.setTime();
    this.initForm();
    this.subscriptionMap = this.placesService.mapReady
      .subscribe((mission) => {
        if (mission === true) {
          this.listenerClick = this.placesService.map.addListener('click', (e) => {
            console.log('clickk credateNews');
            console.log(e);

             const geocoder = new this.placesService.google.maps.Geocoder;
             geocoder.geocode({ 'location': e.latLng }, (results, status) => {
              // console.log(results);
              // console.log(this.placesService.preventLeftclick);
              if (status === 'OK') {
                if (results[0]) {
                  if (!e.placeId) {
                    this.placesService.deleteMarkers();
                    this.placesService.addMarker(results[0]);
                  }
                  console.log(results[0]);
                  console.log('results');
                  this.newsForm.patchValue({ 'adress': results[0].formatted_address });
                  this.newsForm.patchValue({ 'place_id': results[0].place_id });
                  this.newsForm.patchValue({ 'latLng': e.latLng });
                  this.cdRef.detectChanges();
                }
              }
             });

          });

        }
      });
  }

  private initForm() {
    this.newsForm = this.fb.group({
      topicNews: ['', [Validators.required, Validators.maxLength(25)]],
      photoUrl: ['', []],
      dateTimeEvent: [this.dateNowISO, [Validators.required, this.dataValidator]],
      latLng: [],
      adress: ['', [Validators.required]],
      place_id: ['', []],
      description: ['', []],
    });
  }

  ngOnDestroy() {
    console.log('removeAllListeners CREATE');
    this.placesService.google.maps.event.removeListener(this.listenerClick);
  }

  onSubmit() {
    const controls = this.newsForm.controls;
    if (this.newsForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    ///////// * Обработка данных формы *//////////
    console.log(this.newsForm.value);
    this.newsService.createNews(this.newsForm.value);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.newsForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private dataValidator(control: FormControl): ValidationErrors {
    const userTimeDate = new Date(control.value);
    const nowTimeDate = new Date(Date.now());
    if (nowTimeDate > userTimeDate) {
      return { invalidDateTimeEvent: 'Дата должна быть позже текущего времени' };
    }
    return null;
  }

  changePlace($event) {
    console.log($event);
  }


  setTime(): string {
    const timeNow = new Date(Date.now());
    const tzoffset = timeNow.getTimezoneOffset() * 60000;
    const mins = timeNow.getMinutes();
    const round = Math.ceil(mins / 15) * 15;
    timeNow.setMinutes(round);
    const time = (new Date(timeNow.getTime() - (tzoffset))).toISOString().slice(0, 16);
    return time;
  }

  ewclick() {
    // console.log(this.newsService.arrNews$);
  }


}
