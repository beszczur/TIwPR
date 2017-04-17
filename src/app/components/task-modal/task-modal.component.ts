import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  isRepeatable : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClose(){
    (<HTMLInputElement>document.getElementById('eventId')).value = "";
    (<HTMLInputElement>document.getElementById('taskName')).value = "";
    (<HTMLInputElement>document.getElementById('taskPriority')).value = "";
  }

}
