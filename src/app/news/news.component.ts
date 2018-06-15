import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import { PlacesService, Places }  from '../places/places.service';
import { NewsService, NEWS }  from './news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private subscriptionMap: Subscription;
  private subscriptionNews: Subscription;
  public fruits = [];

  public message: any;
  public subscription: Subscription;


  heroes$: Observable<NEWS[]>;

 newsArr: any[];


//https://stackblitz.com/angular/ebmyakqmmgg?file=src%2Fapp%2Fheroes%2Fheroes.component.ts


  constructor(private placesService:PlacesService,
              private newsService:NewsService,) {}

  ngOnInit() {
  	// console.log('OnInit!!!!!  NEWS NEWS NEWS');
    this.subscriptionMap = this.placesService.mapReady
    .subscribe(
      (mission) => {
        if(mission == true){




          // console.log('NEWS NEWS MAP READY');
        }
      });

this.getNews();

}





getNews(): void{
this.newsService.getNews().subscribe(newsArr => this.newsArr = newsArr);
}













  bclick(){

  }




}

// <li *ngFor="let hero of heroes$ | async"
//         [class.selected]="hero.id === selectedId">
//         <a [routerLink]="['/hero', hero.id]">
//           <span class="badge">{{ hero.id }}</span>{{ hero.name }}
//         </a>
//       </li>
//     </ul>

//     <button routerLink="/sidekicks">Go to sidekicks</button>
//   `
// })
// export class HeroListComponent implements OnInit {
//   heroes$: Observable<Hero[]>;

//   private selectedId: number;

//   constructor(
//     private service: HeroService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.heroes$ = this.route.paramMap
//       .switchMap((params: ParamMap) => {
//         // (+) before `params.get()` turns the string into a number
//         this.selectedId = +params.get('id');
//         return this.service.getHeroes();
//       });
//   }
// }
