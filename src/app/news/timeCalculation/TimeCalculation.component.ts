import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-time-calculation',
    template: ` <span>{{timeLeft}}</span> `
})
export class TimeCalculationComponent implements OnInit {

    @Input() time: Date;
    public culculateTime: any;
    public serverTime = new Date();
    public timeLeft: string;
    constructor() { }

    ngOnInit() {

        this.culculateTime = new Date(this.time);
        const minutes = (this.culculateTime.getTime() - this.serverTime.getTime()) / 60000;
        const hours = minutes / 60;
        const days = hours / 24;
        if (Math.floor(days) === 0) {
            (Math.floor(hours) < 1) ? this.timeLeft = 'менее часа' : this.timeLeft = 'Осталось! ' + Math.ceil(hours) + ' часов';
        } else if (Math.floor(days) > -1) {
            this.timeLeft = 'Осталось ' + Math.floor(days) + ' дн' + ' и ' + Math.floor(hours - (Math.floor(days) * 24)) + ' часов';
        } else if (Math.floor(days) === -1) {
            this.timeLeft = ` ${Math.ceil(hours)}ч назад`;
        } else if (Math.floor(days) < -1) {
            this.timeLeft = Math.ceil(days) + ' дн' + ' и ' + Math.floor(hours - (Math.floor(days) * 24)) + 'ч назад';
        }
    }
}
