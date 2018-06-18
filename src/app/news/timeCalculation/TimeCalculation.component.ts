import { Component, Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-timeCalculation',
  template: ` <span>{{timeLeft}}</span> `
})
export class TimeCalculationComponent  implements OnInit {

  @Input() time : Date;

  public serverTime = Date.now();
  public culculateTime : any;
  public timeLeft : string;

  constructor() { }
  ngOnInit() {
    this.culculateTime = new Date(this.time);


    var minutes = (this.culculateTime - this.serverTime) / 60000;

    var hours = minutes / 60;

    var days = hours / 24;

console.log(days);
    if (Math.ceil(days) == 0) {
      this.timeLeft = 'Осталось ' + Math.ceil(hours) +' часов';
    } else if (Math.ceil(days) > 0) {
      this.timeLeft = 'Осталось ' + Math.ceil(days) +' дней';
    } else if (Math.ceil(days) < 0) {
      this.timeLeft = `Осталось ${Math.ceil(days)}`
    }

  }

}