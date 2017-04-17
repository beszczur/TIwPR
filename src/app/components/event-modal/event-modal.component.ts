import {Component, OnInit} from '@angular/core';
import {Event} from '../../models/event'
import {DataproviderService} from "../../dataproviders/dataprovider.service";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-event-modal',
  templateUrl: 'event-modal.component.html',
  styleUrls: ['event-modal.component.scss'],
  providers: [DataproviderService]
})
export class EventModalComponent implements OnInit {

  isRepeatable : boolean = false;

  constructor(private dataProvider: DataproviderService, private toasterService: ToasterService) {
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
      22, //id
      (<HTMLInputElement>document.getElementById("eventName")).value,
      parseInt((<HTMLInputElement>document.getElementById("position")).value),
      (<HTMLInputElement>document.getElementById("date")).value,
      this.isRepeatable,
      [] //tasks
    );
    if(this.dataProvider.addEvent(newEvent))
    {
      this.onClose();
      this.toasterService.pop('success', 'New event was successfully created', '');
    }
    else
    {
      this.toasterService.pop('error', 'New event can\'t be created. Try again', '');
    }
  }

}
