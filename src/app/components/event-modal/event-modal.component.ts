import {Component, OnInit} from '@angular/core';
import {Event} from '../../models/event'
import {DataproviderService} from "../../dataproviders/dataprovider.service";

@Component({
  selector: 'app-event-modal',
  templateUrl: 'event-modal.component.html',
  styleUrls: ['event-modal.component.scss'],
  providers: [DataproviderService]
})
export class EventModalComponent implements OnInit {

  isRepeatable : boolean = false;

  constructor(private dataProvider: DataproviderService) {
  }

  ngOnInit() {
  }

  onClose(){
    (<HTMLInputElement>document.getElementById("date")).value = "";
    (<HTMLInputElement>document.getElementById("eventName")).value = "";
    (<HTMLInputElement>document.getElementById("priority")).value = "";
  }

  addNewEvent(){
    var newEvent = new Event(
      22,
      (<HTMLInputElement>document.getElementById("eventName")).value,
      0,
      (<HTMLInputElement>document.getElementById("date")).value,
      false,
      []
    );
    this.dataProvider.addEvent(newEvent);
    this.onClose();
  }

}
