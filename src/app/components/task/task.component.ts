import {Component, OnInit, Input} from '@angular/core';
import {Task} from "../../models/task";

@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

  changeState(new_state: number){
    this.task.status = new_state;
    // TODO: after this function backend should be informed
  }

  fillInTaskEditModal(){
    (<HTMLInputElement>document.getElementById('taskName')).value = this.task.name;
    (<HTMLInputElement>document.getElementById('priority')).value = (this.task.priority).toString();
    (<HTMLInputElement>document.getElementById('taskId')).value = (this.task.id).toString();
    (<HTMLInputElement>document.getElementById('eventId')).value = (this.task.eventId).toString();
  }

}
