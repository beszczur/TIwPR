import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: 'day.component.html',
  styleUrls: ['day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() day: string;
  events = ["Przedmiot 1", "Przedmiot 2"];
  constructor() { }

  ngOnInit() {
  }

}
