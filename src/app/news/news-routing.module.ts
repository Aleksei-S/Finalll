import { AuthGuard } from '../routing/auth.guard';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const newsRoutes: Routes = [
    { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
    { path: 'news/createNews', component: CreateNewsComponent, canActivate: [AuthGuard] },
    { path: 'news/:_id', component: NewsDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(newsRoutes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }
