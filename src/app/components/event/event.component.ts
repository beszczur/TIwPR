import {Component, OnInit, Input} from '@angular/core';
import {Event} from '../../models/event'
import {TaskModalComponent} from "../task-modal/task-modal.component";

@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss'],
  providers: [TaskModalComponent]
})
export class EventComponent implements OnInit {

  @Input() event: Event;

  constructor(private taskModal : TaskModalComponent) { }

  ngOnInit() {
  }

  displayAddTaskModal(){
    this.taskModal.setModalEventId(this.event.id);
  }

}
