import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TaskComponent } from './components/task/task.component';
import { DayComponent } from './components/day/day.component';
import { WeekComponent } from './components/week/week.component';
import { EventComponent } from './components/event/event.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';

@NgModule({
  declarations: [
    TaskComponent,
    DayComponent,
    WeekComponent,
    EventComponent,
    EventModalComponent,
    TaskModalComponent
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
