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
  }

  taskEditModal(){
    (<HTMLInputElement>document.getElementById('taskName')).value = this.task.name;
    (<HTMLInputElement>document.getElementById('taskPriority')).value = (this.task.position).toString();
    //(<HTMLInputElement>document.getElementById('taskId')).value = (this.task.id).toString();
    (<HTMLInputElement>document.getElementById('eventId')).value = (this.task.eventId).toString();
  }

}
