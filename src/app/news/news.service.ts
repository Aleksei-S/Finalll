import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


export class NEWS {
  constructor(
    public adress: string,
    public createDate: Date,
    public createdUser: string,
    public dateTimeEvent: Date,
    public description: any,
    public latLng: Object,
    public marker: Object,
    public photoUrl: string,
    public place_id: string,
    public topicNews: string,
  ) { }
}

export class MESSAGE {
  constructor(
    public message: string,

  ) { }
}


@Injectable()
export class NewsService {

  public currentNews$: Observable<NEWS> = new Observable<NEWS>();
  public currentNews: NEWS;
  public listFilter = ['По дате создания события', 'По дате начала события'];
  public selectedSort = 'По дате начала события';

  constructor(private http: HttpClient, private router: Router) { }

  addMessage(message: MESSAGE) {
    console.log(message);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    this.http.post('/api/createMessage', message, options)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  createNews(news: NEWS) {
    console.log(news);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    this.http.post('/api/createNews', news, options)
      .subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/news']);
      });
  }

  deleteMessage(_idMessage: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const obj = { id: _idMessage };
    return this.http.post('/api/deleteMessage', obj, options);
  }

  editMessage(_idMessage: string, newMessage: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const obj = { id: _idMessage, message: newMessage };
    return this.http.post('/api/editMessage', obj, options);
  }

  getNews(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.get('/api/getNews', options);
  }

  getOneNews(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    params = params.append('_id', id);
    return this.http.get('/api/getOneNews', { headers: headers, params: params });
  }

  getMessages(_idNews: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    params = params.append('_idNews', _idNews);
    return this.http.get('/api/getMessages', { headers: headers, params: params });
  }

}
