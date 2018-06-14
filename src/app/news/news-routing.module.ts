import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { AuthGuard } from '../routing/auth.guard';

const newsRoutes: Routes = [
{ path: 'news', component: NewsComponent,canActivate:[AuthGuard] },
{ path: 'news/createNews', component: CreateNewsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
