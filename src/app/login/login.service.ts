import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router }  from '@angular/router';



export class USER {
    constructor(
        public _id: string,
        public name: string,
        public password: string,
        public photoUrl: string
        ) { }
}



@Injectable()
export class LoginService {
public currentUser: USER;
  constructor(private http: HttpClient, private router: Router) { }




  getUser(jwtToken): void {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let options = {headers:headers};
    this.http.post('/api/getUser', JSON.stringify({token : jwtToken}), options )
    .subscribe((response: any) => {
      // console.log(response);
       if (response.success) {
          this.currentUser = <USER>response.user;
          console.log(this.currentUser);
          let userObj: any = {};
          userObj.user = response.user;
          userObj.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(userObj));
          this.router.navigate(['/'])
       }
    });
  }

  isLoggedIn(): boolean {
    try {
      const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
      if (theUser) {
        this.currentUser = theUser.user;
      }
    } catch (e) {
      return false;
    }
    return !!this.currentUser;
  }

  login(oUser):void{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let options = {headers:headers};
    this.http.post('/api/login/', JSON.stringify(oUser), options)
    .subscribe((response) => {
      console.log("REEEEEEEEESSSSSPONCE!!!!!");
      console.log(response);
      // if (response.json().success) {
      //   this.currentUser = <USER>response.json().message;
      //   let userObj: any = {};
      //   userObj.user = response.json().message;
      //   userObj.token = response.json().token;
      //   localStorage.setItem('currentUser', JSON.stringify(userObj));
      // }
      // response.json();
    });
  }


  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }
















}
