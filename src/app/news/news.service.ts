import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


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

    public currentNews$: Observable<NEWS> = new Observable<NEWS>();
    public currentNews: NEWS;

    constructor(private http: HttpClient, private router: Router) { }

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

    addMessage(message: MESSAGE) {
        console.log(message);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        this.http.post('/api/createMessage', message, options)
            .subscribe((response: any) => {
                console.log(response);
            });
    }

    getMessages(_idNews: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams();
        params = params.append('_idNews', _idNews);
        return this.http.get('/api/getMessages', { headers: headers, params: params });
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


}
