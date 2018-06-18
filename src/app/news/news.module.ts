import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsService } from './news.service';
import { TimeCalculationComponent } from './timeCalculation/TimeCalculation.component';
import { NewsDetailsComponent } from './news-details/news-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NewsRoutingModule
  ],
  declarations: [NewsComponent, CreateNewsComponent, TimeCalculationComponent, NewsDetailsComponent],
  providers: [ NewsService ]
})
export class NewsModule { }
