import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: string;
  tasks = ["task1", "task2"];
  constructor() { }

  ngOnInit() {
  }

}
