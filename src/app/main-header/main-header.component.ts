import { Component, OnInit } from '@angular/core';
import { LoginService }  from '../login/login.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
togleMenu = false;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

clickMenuBtn(e){
e.preventDefault();
	this.togleMenu = !this.togleMenu;
}

}
