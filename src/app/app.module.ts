import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TaskComponent } from './week/day/event/task/task.component';
import { DayComponent } from './week/day/day.component';
import { WeekComponent } from './week/week.component';
import { EventComponent } from './week/day/event/event.component';
import { EventModalComponent } from './week/day/event/event-modal/event-modal.component';

@NgModule({
  declarations: [
    TaskComponent,
    DayComponent,
    WeekComponent,
    EventComponent,
    EventModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [WeekComponent]
})
export class AppModule { }
