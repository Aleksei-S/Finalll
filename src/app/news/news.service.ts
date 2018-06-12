import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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




@Injectable()
export class NewsService {

    public currentNews : NEWS;
    public arrNews$ : Observable<NEWS> = new Observable<NEWS>();
    // public arrNews$ : Observable<NEWS>;

  constructor() { }





    createNews(news){
        // this.arrNews$.next(news);
    }

    getAllNews(){

    }
    editNews(){
        
    }

    deleteNews(){
        
    }

}
