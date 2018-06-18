import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NEWS }  from '../news.service';
import { PlacesService }  from '../../places/places.service';

@Component({
	selector: 'app-news-details',
	templateUrl: './news-details.component.html',
	styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
	public currentNews : any;
	public messageForm: FormGroup;
	private idNews : any;
	constructor(private activatedRoute: ActivatedRoute, 
				private newsService: NewsService,
				private placesService: PlacesService,
				private fb: FormBuilder) { }

	ngOnInit() {
		this.getNews();
		this.placesService.preventLeftclick = true;
		this.initFormMessage();
		///make bounds
	}

	getNews(): void {
		this.idNews = this.activatedRoute.snapshot.paramMap.get('_id');
		this.newsService.getOneNews(this.idNews)
		.map(e => {return e.data})
		.subscribe(news => {
			console.log(news);
			this.currentNews = news;
			this.getMessages();
		},
		(err) => {console.log(err)}
		);
	}


		private initFormMessage() {
	        this.messageForm = this.fb.group({
	            message: ['', [Validators.required,  Validators.maxLength(250)]],
	            idNews: [this.idNews],
	        });
	    }

	    isControlInvalid(controlName: string): boolean {
	        const control = this.messageForm.controls[controlName];
	        const result = control.invalid && control.touched;
	        return result;
	    }

		onSubmit() {
			console.log('onSubmit');
        const controls = this.messageForm.controls;
        if (this.messageForm.invalid) {
            Object.keys(controls)
            .forEach(controlName => controls[controlName].markAsTouched());
            return;
        }
	    /////////* Обработка данных формы *//////////
	    console.log(this.messageForm.value);
	    this.newsService.addMessage(this.messageForm.value);
		}


	getMessages(): void {
		this.newsService.getMessages(this.idNews)
		.map(e => {return e.data})
		.subscribe(news => {
			console.log(news);
			// this.currentNews = news;
		},
		(err) => {console.log(err)}
		);
	}








	ngOnDestroy() {
	    this.placesService.preventLeftclick = false;
	}

}
