import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-event-modal',
  templateUrl: 'event-modal.component.html',
  styleUrls: ['event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  @Input() type: string;
  isRepeatable = false;

  constructor() {
  }

  ngOnInit() {
  }

}
