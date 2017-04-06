import {Component, OnInit, Input} from '@angular/core';
import {Event} from '../../models/event'

@Component({
  selector: 'app-event-modal',
  templateUrl: 'event-modal.component.html',
  styleUrls: ['event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  @Input() type: string;
  @Input() event: Event;

  constructor() {
  }

  ngOnInit() {
  }

}
