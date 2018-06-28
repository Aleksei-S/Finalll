import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  el: any;

  ngOnInit() {
    this.el = document.getElementById('menu-btn');
    this.el.addEventListener('click', function (e) {
      const leftMenu = document.getElementById('leftMenu');
      leftMenu.classList.toggle('hide-menu');
    });
  }

}
