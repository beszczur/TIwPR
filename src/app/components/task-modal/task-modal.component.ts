import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task";
import {ToasterService} from "angular2-toaster";
import {DataproviderService} from "../../dataproviders/dataprovider.service";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  isRepeatable : boolean = false;

  constructor(private dataProvider: DataproviderService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  public setModalEventId(eventId: number)
  {
    (<HTMLInputElement>document.getElementById('eventId')).value = (eventId).toString();
  }

  onClose(){
    (<HTMLInputElement>document.getElementById('eventId')).value = '';
    (<HTMLInputElement>document.getElementById('taskName')).value = '';
    (<HTMLInputElement>document.getElementById('priority')).value = '';
    (<HTMLInputElement>document.getElementById('isTaskRepeatable')).checked = false;
    this.isRepeatable = false;
  }

  setModalData(task: Task){
    (<HTMLInputElement>document.getElementById('taskName')).value = task.name;
    (<HTMLInputElement>document.getElementById('priority')).value = (task.priority).toString();
    (<HTMLInputElement>document.getElementById('taskId')).value = (task.id).toString();
    (<HTMLInputElement>document.getElementById('eventId')).value = (task.eventId).toString();
  }

  submitTask(){
    if((<HTMLInputElement>document.getElementById('taskId')).value === '')
    {
      console.log("ADD");
      var newTask = new Task(
        22, //id
        parseInt((<HTMLInputElement>document.getElementById('eventId')).value),
        (<HTMLInputElement>document.getElementById('taskName')).value,
        0, // status
        parseInt((<HTMLInputElement>document.getElementById('priority')).value)
      );

      if(this.dataProvider.addTask(newTask))
      {
        this.onClose();
        this.toasterService.pop('success', 'New task was successfully created', '');
      }
      else
      {
        this.toasterService.pop('error', 'New task can\'t be created. Try again', '');
      }
    }
    else
    {
      console.log("EDIT");
      var editedTask = new Task(
        parseInt((<HTMLInputElement>document.getElementById('taskId')).value),
        parseInt((<HTMLInputElement>document.getElementById('eventId')).value),
        (<HTMLInputElement>document.getElementById('taskName')).value,
        0, // status
        parseInt((<HTMLInputElement>document.getElementById('priority')).value)
      );

      if(this.dataProvider.editTask(editedTask))
      {
        this.onClose();
        this.toasterService.pop('success', 'Task was edited', '');
      }
      else
      {
        this.toasterService.pop('error', 'Task can\'t be edited. Try again', '');
      }
    }
  }

}
