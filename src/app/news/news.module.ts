import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreateNewsComponent } from './create-news/create-news.component';
import { EditComponent } from './edit/edit.component';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsRoutingModule } from './news-routing.module';
import { NewsService } from './news.service';
import { TimeCalculationComponent } from './timeCalculation/TimeCalculation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
      CreateNewsComponent,
      EditComponent,
      NewsComponent,
      NewsDetailsComponent,
      TimeCalculationComponent
    ],
  providers: [ NewsService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class NewsModule { }
