import {Component, OnInit, Input} from '@angular/core';
import {Day} from '../../models/day';
import {EventModalComponent} from "../event-modal/event-modal.component";

@Component({
  selector: 'app-day',
  templateUrl: 'day.component.html',
  styleUrls: ['day.component.scss'],
  providers: [EventModalComponent]
})
export class DayComponent implements OnInit {

  @Input() day: Day;
  @Input() id: number;

  constructor(private eventModal: EventModalComponent) { }

  ngOnInit() {
  }

  addModalFunction(date: string){
    this.eventModal.setModalDate(date);
  }
}
