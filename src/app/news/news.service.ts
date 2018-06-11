import { Injectable } from '@angular/core';

export class NEWS {
    constructor(
        // public datetimeCreate: Date,
        // public userId: string,
        public name: string,
        public dateTimeEvent: Date,
        public adress: string,
        public location: any,
        public description: any,
        ) { }
}




@Injectable()
export class NewsService {

  constructor() { }

}
