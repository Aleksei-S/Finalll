import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NEWS }  from '../news.service';
import { PlacesService }  from '../../places/places.service';
import { LoginService }  from '../../login/login.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
	selector: 'app-news-details',
	templateUrl: './news-details.component.html',
	styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

	public currentNews : any;
	public messageForm: FormGroup;
	private idNews : any;
	private messageArr: Subscription;
	private messageFormControl: boolean = false;


	constructor(private activatedRoute: ActivatedRoute, 
				private newsService: NewsService,
				private placesService: PlacesService,
				private loginService: LoginService,
				private fb: FormBuilder) { }

	ngOnInit() {
		this.getNews();
		this.placesService.preventLeftclick = true;
		this.initFormMessage();

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



		onSubmit() {
			console.log('onSubmit');
	        const controls = this.messageForm.controls;
	        if (this.messageForm.invalid) {
				this.messageFormControl = true;
	            return;
	        }
		    /////////* Обработка данных формы *//////////
		    console.log(this.messageForm.value);
		    this.newsService.addMessage(this.messageForm.value);
 			this.ngOnInit();
		}


	getMessages(): void {
		this.newsService.getMessages(this.idNews)
		.map(e => {return e.data})
		.subscribe(news => {
			console.log(news);
			this.messageArr = news;

		},
		(err) => {console.log(err)}
		);
	}



	  saveMessage(value, parentMessage){
	    console.log(value);
	    console.log(parentMessage);
	    alert("ПОТОМ ДОПИШУ СЕРВЕРНУЮ ЧАСТЬ");
	  }


	deleteMessage(_id){
		console.log('value');
		 this.newsService.deleteMessage(_id)
		 .subscribe((response: any) => {
          console.log(response);
          if (response.success == false) {
          	alert(response.message);
          }
          this.ngOnInit();
     });
	}


	ngOnDestroy() {
	    this.placesService.preventLeftclick = false;
	}



  bclick(){
console.log(this.messageArr);

const theUser: any = JSON.parse(localStorage.getItem('currentUser'));



  }






}
