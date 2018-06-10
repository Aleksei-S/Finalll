import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { CreateNewsComponent } from './create-news/create-news.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule
  ],
  declarations: [NewsComponent, CreateNewsComponent]
})
export class NewsModule { }
