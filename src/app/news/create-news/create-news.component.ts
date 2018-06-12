import { Component, OnInit, ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';
import { PlacesService, Places }  from '../../places/places.service';
import { NewsService, NEWS }  from '../news.service';


// const now = new Date(Date.now()).toISOString().slice(0, 16);
const now = new Date(Date.now());

@Component({
    selector: 'app-create-news',
    templateUrl: './create-news.component.html',
    styleUrls: ['./create-news.component.css']
})

export class CreateNewsComponent implements OnInit {
    private subscriptionMap: Subscription;
    private listenerClick:  any;
    public newsForm: FormGroup;
    public news: NEWS = new NEWS ('NAMEEEEE','https://telegraf.com.ua/files/2018/02/1-3268.jpg',
        now,'',"",'');

    public dateNowISO : string;

    constructor(private placesService:PlacesService,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();
        let tzoffset = now.getTimezoneOffset() * 60000; //offset in milliseconds
        this.dateNowISO = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

        this.subscriptionMap = this.placesService.mapReady
        .subscribe((mission) => {
            if(mission == true){
                this.listenerClick = this.placesService.map.addListener('click',(e)=>{
                    let geocoder = new this.placesService.google.maps.Geocoder;
                    geocoder.geocode({'location': e.latLng}, (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                if (!e.placeId) {
                                    this.placesService.deleteMarkers();
                                    this.placesService.addMarker(results[0]);
                                }
                                // this.news.adress = results[0].formatted_address;
                                // this.news.location.geometry = results[0].geometry;
                                // this.news.location.place_id = results[0].place_id;
                                this.newsForm.patchValue ({'adress': results[0].formatted_address});
                                this.newsForm.patchValue ({'place_id': results[0].place_id});
                                this.cdRef.detectChanges();
                            }
                        }
                    });

                });

            }
        });
    }

    dataChange(e) {
        this.news.dateTimeEvent = new Date(e);
        this.newsForm.patchValue ({'dateTimeEvent': new Date(e)});
    }

    ngOnDestroy() {
        this.placesService.google.maps.event.removeListener(this.listenerClick);
    }

    private initForm() {
            this.newsForm = this.fb.group({
            name: ['NAMEEEEEEEEFFFFFFFFFF', [Validators.required]],
            photoUrl: ['https://telegraf.com.ua/files/2018/02/1-3268.jpg', []],
            dateTimeEvent: ['', [Validators.required]],
            adress: ['', [Validators.required]],
            place_id: ['', [Validators.required]],
            description: ['', []],
            });
    }

    onSubmit() {
        // const controls = this.myFirstReactiveForm.controls;

        // if (this.myFirstReactiveForm.invalid) {
        //   Object.keys(controls)
        //     .forEach(controlName => controls[controlName].markAsTouched());

        //   return;
    // }

    // /** TODO: Обработка данных формы */
    // console.log(this.myFirstReactiveForm.value);
}

isControlInvalid(controlName: string): boolean {
    // const control = this.myFirstReactiveForm.controls[controlName];

    // const result = control.invalid && control.touched;

     return true;
}






ewclick(){
    console.log(this.news);


}


}
