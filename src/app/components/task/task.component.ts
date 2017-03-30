import {Component, OnInit, Input} from '@angular/core';
import {Status} from "../../models/status";
import {Task} from "../../models/task";

@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  status = new Status();

  constructor() { }

  ngOnInit() {
  }

  changeState(new_state: Number){
    this.task.status = new_state;
  }

}