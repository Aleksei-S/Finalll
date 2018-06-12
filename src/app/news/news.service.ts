import { Injectable } from '@angular/core';

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

  constructor() { }

}
