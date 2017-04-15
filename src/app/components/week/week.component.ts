import {Component, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {DataproviderService} from "../../dataproviders/dataprovider.service";
import {Task} from "../../models/task";

@Component({
  selector: 'app-week',
  templateUrl: 'week.component.html',
  styleUrls: ['week.component.scss'],
  providers: [DataproviderService],
})
export class WeekComponent implements OnInit {

  private plan: any[] = [
    {
      name: "MONDAY",
      date: "2017-04-24",
      events:
        [{
          id: 1,
          name: 'ZSK',
          tasks: [
            new Task(1, 1, "Zadanie 1 z konstruktora", 0, 0),
            new Task(2, 1, "Zadanie 2 z konstruktora", 0, 1),
          ]
        },
          {
            id: 2,
            name: 'Angielski',
            tasks: [
              new Task(3, 2, "Zadanie 1A z konstruktora", 0, 0),
              new Task(4, 2, "Zadanie 2A z konstruktora", 0, 1),
            ]
          },
        ]
    },
    {
      name: "TUESDAY",
      date: "2017-04-25",
      events:
        [{
          id: 3,
          name: 'Praca',
          tasks: [
            new Task(5, 3, "TASK 1C", 0, 0),
            new Task(6, 3, "TASK 2C", 1, 1),
          ]
        },
          {
            id: 4,
            name: 'NT4G',
            tasks: [
              new Task(7, 4, "Task 1A", 1, 0),
              new Task(8, 4, "Task 2A", 0, 1),
            ]
          },
        ]
    },
    {
      name: "WEDNESDAY",
      date: "2017-04-26",
      events: []
    },
    {
      name: "TUESDAY",
      date: "2017-04-27",
      events: []
    },
    {
      name: "FRIDAY",
      date: "2017-04-28",
      events: []
    },
    {
      name: "WEEKEND",
      date: "2017-04-29/2017-04-30",
      events: [
        {
          id: 5,
          name: 'Trip preparation',
          tasks: [
            new Task(9, 5, "packing", 0, 0),
            new Task(10, 5,"bike cleaning", 0, 0),
          ]
        },
      ]
    }
  ];

  //whatTime = Observable.interval(1000).map(x => new Date()).share();

  constructor(private dataProvider: DataproviderService) {}

  ngOnInit() {
  }

}
