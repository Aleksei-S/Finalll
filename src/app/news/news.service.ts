import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Subject }    from 'rxjs/Subject';
import {  HttpParams, HttpClient , HttpHeaders } from '@angular/common/http';
import { Router }  from '@angular/router';











export class NEWS {
  constructor(
        public createdUser: string,
        public createDate: Date,
        public topicNews: string,
        public photoUrl: string,
        public dateTimeEvent: Date,
        public latLng: Object,
        public adress: string,
        public place_id: string,
        public description: any,
        public marker: Object,
        ) { }
}

export class MESSAGE {
  constructor(
        public message: string,

        ) { }
}






@Injectable()
export class NewsService {

    // public currentNews : NEWS;
    public currentNews$ : Observable<NEWS> = new Observable<NEWS>();
public currentNews : NEWS;





 constructor(private http: HttpClient, private router:Router) { }






 getNews(): Observable<any> {
   // return Observable.of(arrNEEWS);
let headers = new HttpHeaders({'Content-Type':'application/json'});
let options = {headers:headers};
    return  this.http.get('/api/getNews', options);
 }

 getOneNews(id: string) : Observable<any> {
let headers = new HttpHeaders({'Content-Type':'application/json'});
let params = new HttpParams();
params = params.append("_id", id);
    return  this.http.get('/api/getOneNews', {headers:headers, params: params});

    }



createNews(news:NEWS){
  console.log(news);
  let headers = new HttpHeaders({'Content-Type':'application/json'});
  let options = {headers:headers};
  this.http.post('/api/createNews', news, options )
  .subscribe((response: any) => {
    console.log(response);
    this.router.navigate(['/news']);
     });


}


addMessage(message:MESSAGE){
  console.log(message);
  let headers = new HttpHeaders({'Content-Type':'application/json'});
  let options = {headers:headers};
  this.http.post('/api/createMessage', message, options )
  .subscribe((response: any) => {
    console.log(response);
    // refresh
  });
}

  getMessages(_idNews: string) : Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let params = new HttpParams();
    params = params.append("_idNews", _idNews);
    return  this.http.get('/api/getMessages', {headers:headers, params: params});
  }




// sendMessage(message: any) {
//   console.log(message);
//   this.fruits.push(message);
//   this.subject.next( message );
// }
// getMessage(): Observable<any> {
//   return this.subject;
// }
// COMPONENT
//     sendMessage(): void {
//         // send message to subscribers via observable subject
//         this.messageService.sendMessage('Message from Home Component to App Component!');
//     }
// SERVICE
//  private subject = new Subject<any>();
// sendMessage(message: string) {
//         this.subject.next({ text: message });
//     }
//     getMessage(): Observable<any> {
//         return this.subject.asObservable();
//     }
// COMPONENT 2
//   message: any;
//     subscription: Subscription;
// this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });



}
