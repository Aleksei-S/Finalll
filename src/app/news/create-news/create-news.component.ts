import { Component, OnInit, ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';
import { PlacesService, Places }  from '../../places/places.service';
import { NewsService, NEWS }  from '../news.service';


@Component({
    selector: 'app-create-news',
    templateUrl: './create-news.component.html',
    styleUrls: ['./create-news.component.css']
})

export class CreateNewsComponent implements OnInit {
    private subscriptionMap: Subscription;
    private listenerClick:  any;

    public newsForm: FormGroup;
    public dateNowISO : string;

    constructor(private placesService:PlacesService,
        private newsService :NewsService,
        private cdRef: ChangeDetectorRef,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.dateNowISO = this.setTime();
        this.initForm();
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
                                 console.log('results[0]');
                                console.log(results[0]);
                                   console.log('results');
                                console.log(results);
                                   console.log('e');
                                console.log(e);
                                this.newsForm.patchValue ({'adress': results[0].formatted_address});
                                this.newsForm.patchValue ({'place_id': results[0].place_id});
                                this.newsForm.patchValue ({'latLng': e.latLng});
                                // if (results[0].geometry) {
                                //     // this.newsForm.patchValue ({'place_id': results[0].place_id});
                                //     console.log('results[0].geometry');
                                //     console.log(results[0].geometry);
                                // }

                                this.cdRef.detectChanges();
                            }
                        }
                    });

                });

            }
        });
    }





    setTime() :string {
        let timeNow = new Date(Date.now());
        let tzoffset = timeNow.getTimezoneOffset() * 60000; //offset in milliseconds
        let mins = timeNow.getMinutes();
        let round = Math.ceil(mins / 15) * 15; // округляем до 15
        timeNow.setMinutes(round);
        let time = (new Date(timeNow.getTime()- (tzoffset))).toISOString().slice(0, 16);
        return time;
    }

    private initForm() {
        this.newsForm = this.fb.group({
            topicNews: ['СОБЫТИЕ ИМЕНИ ПУШКИНА', [Validators.required,  Validators.maxLength(25)]],
            photoUrl: ['https://telegraf.com.ua/files/2018/02/1-3268.jpg', []],
            dateTimeEvent: [this.dateNowISO, [Validators.required, this.passwordValidator]],
            latLng: [],
            adress: ['', [Validators.required]],    
            place_id: ['', []],
            description: ['', []],
        });
    }

    onSubmit() {
        const controls = this.newsForm.controls;
        if (this.newsForm.invalid) {
            Object.keys(controls)
            .forEach(controlName => controls[controlName].markAsTouched());
            return;
        }

    /////////* Обработка данных формы *//////////
    console.log(this.newsForm.value);
    this.newsService.createNews(this.newsForm.value);

}

    isControlInvalid(controlName: string): boolean {
        const control = this.newsForm.controls[controlName];
        const result = control.invalid && control.touched;
        return result;
    }

    private passwordValidator(control: FormControl): ValidationErrors {
        let userTimeDate = new Date(control.value);
        let nowTimeDate = new Date(Date.now());
        if (nowTimeDate > userTimeDate) {
            return { invalidDateTimeEvent: 'Дата должна быть позже текущего времени' };
        }
        return null;
    }
changePlace($event){
    console.log($event);
}






    ngOnDestroy() {
        this.placesService.google.maps.event.removeListener(this.listenerClick);
    }




    ewclick(){
        // console.log(this.newsService.arrNews$);
    }


}
