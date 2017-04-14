import {Component, OnInit, Input} from '@angular/core';
import {Event} from '../../models/event'

@Component({
  selector: 'app-event-modal',
  templateUrl: 'event-modal.component.html',
  styleUrls: ['event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  isRepeatable : boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  onClose(){
    (<HTMLInputElement>document.getElementById("date")).value = "";
    (<HTMLInputElement>document.getElementById("eventName")).value = "";
    (<HTMLInputElement>document.getElementById("priority")).value = "";
  }

}
