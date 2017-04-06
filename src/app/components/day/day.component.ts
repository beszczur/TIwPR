import {Component, OnInit, Input} from '@angular/core';
import {Event} from '../../models/event'

@Component({
  selector: 'app-day',
  templateUrl: 'day.component.html',
  styleUrls: ['day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() day: string;
  @Input() id: number;
  event = new Event();

  constructor() { }

  ngOnInit() {
  }

  addModalFunction(date: string){
    this.event.date = date;
    this.event.isRepeatable = false;
    console.log(this.event);
  }

}
