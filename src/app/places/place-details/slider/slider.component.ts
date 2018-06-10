import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent   {

 @Input() photoArr : any[];
	public indexphotoArr = 0;
  	constructor() { }

    moveLeft() {
		(this.indexphotoArr == 0) ? this.indexphotoArr = this.photoArr.length-1 : this.indexphotoArr--;
    }

    moveRight() {
		(this.photoArr.length-1 == this.indexphotoArr) ? this.indexphotoArr = 0: this.indexphotoArr++;
    }

}
