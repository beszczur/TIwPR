import {Component, OnInit, Input} from '@angular/core';
import {Task} from "../../models/task";
import {TaskModalComponent} from "../task-modal/task-modal.component";

@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss'],
  providers: [TaskModalComponent]
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private taskModal: TaskModalComponent) { }

  ngOnInit() {
  }

  changeState(new_state: number){
    this.task.status = new_state;
    // TODO: after this function backend should be informed
  }

  fillInTaskEditModal(){
    this.taskModal.setModalData(this.task);
  }

}
