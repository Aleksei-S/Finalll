import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Subject }    from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class NEWS {
  constructor(
        // public datetimeCreate: Date,
        // public userId: string,
        public name: string,
        public photoUrl: string,
        public dateTimeEvent: Date,
        public adress: string,
        public place_id: string,
        public description: any,
        ) { }
}

const arrNEEWS = [
new NEWS("СОБЫТИE", "https://telegraf.com.ua/files/2018/02/1-3268.jpg", new Date("2018-06-18T14:15"),
  "ул. Московская 204Б, Брест, Беларусь", "ChIJw3Y8N6EOIUcREw0zVaQ-Bqc", "OPIS"),
new NEWS("NAMEEEEEE", "https://telegraf.com.ua/files/2018/02/1-3268.jpg", new Date("2018-06-19T14:25"),
  "ул. Советской Конституции 2, Брест, Беларусь", "Ek_QstGD0LsuINCh0LDQstC10YbQutCw0Lkg0JrQsNC90YHRgtGL0YLRg9GG0YvRliAyLCDQkdGA0Y3RgdGCLCDQkdC10LvQsNGA0YPRgdGMIhoSGAoUChIJU-keL6MOIUcRy-xP-Ndq_e0QAg", "ahahaha"),
new NEWS("HRRRRRRRR", "https://telegraf.com.ua/files/2018/02/1-3268.jpg", new Date("2018-06-18T14:15"),
  "ул. Киевская, Брест, Беларусь", "ChIJ9_7ZEqwOIUcRbl8rmDtWoxI", "op99999rrrr"),
new NEWS("ggggggggg ggg", "https://telegraf.com.ua/files/2018/02/1-3268.jpg", new Date("2018-06-16T14:35"),
  "ул. Пионерская 85, Брест, Беларусь", "ChIJb4lHIh0MIUcRyrdz8rzbnZ4", "hai my name is vasty"),
];



@Injectable()
export class NewsService {

    // public currentNews : NEWS;
    public currentNews : Observable<NEWS> = new Observable<NEWS>();
    public arrNews$ : Observable<NEWS[]> = new Observable<NEWS[]>();
    // public arrNews$ : Observable<NEWS>;
// public arrNews$: Subject<NEWS> = new Subject<NEWS>();
 // public News$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
 // public arrNews$: Subject<NEWS> = new Subject<NEWS>();
 public fruits = [];
 private subject = new Subject<any>();
 constructor(private http: HttpClient) { }



  // getHeroes(): Observable<any[]> {
  //   // TODO: send the message _after_ fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }



 getNews(): Observable<any> {
   // return Observable.of(arrNEEWS);
let headers = new HttpHeaders({'Content-Type':'application/json'});
let options = {headers:headers};
    return  this.http.get('/api/getNews', options);
 }

 getOneNews(id: number | string) {
   return this.getNews()
      // (+) before `id` turns the string into a number
      // .map(heroes => heroes.find(hero => hero.id === +id));
    }



// addHero (hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
//     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
//     catchError(this.handleError<Hero>('addHero'))
//   );
// }





createNews(news:NEWS){
  console.log(news);
  let headers = new HttpHeaders({'Content-Type':'application/json'});
  let options = {headers:headers};
  this.http.post('/api/createNews', news, options )
  .subscribe((response: any) => {
    console.log(response);
       // if (response.success) {
       //   console
       // }
     });


}


sendMessage(message: any) {
  console.log(message);
  this.fruits.push(message);
  this.subject.next( message );
}
getMessage(): Observable<any> {
  return this.subject;
}
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






getAllNews(){

}
editNews(){

}

deleteNews(){

}

}
