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
      name: "PONIEDZIAŁEK",
      date: "2017-04-03",
      events:
        [{
          name: 'ZSK',
          tasks: [
            new Task(1, "Zadanie 1 z konstruktora", 0, 0, '2017-04-03'),
            new Task(2, "Zadanie 2 z konstruktora", 0, 1, '2017-04-03'),
          ]
        },
          {
            name: 'Angielski',
            tasks: [
              new Task(3, "Zadanie 1A z konstruktora", 0, 0, '2017-04-03'),
              new Task(4, "Zadanie 2A z konstruktora", 0, 1, '2017-04-03'),
            ]
          },
        ]
    },
    {
      name: "WTOREK",
      date: "2017-04-04",
      events:
        [{
          name: 'Praca',
          tasks: [
            new Task(5, "Zadanie 1C z konstruktora", 0, 0, '2017-04-04'),
            new Task(6, "Zadanie 2C z konstruktora", 1, 1, '2017-04-04'),
          ]
        },
          {
            name: 'NT4G',
            tasks: [
              new Task(7, "Zadanie 1A z konstruktora", 1, 0, '2017-04-04'),
              new Task(8, "Zadanie 2A z konstruktora", 0, 1, '2017-04-04'),
            ]
          },
        ]
    },
    {
      name: "ŚRODA",
      date: "2017-04-05",
      events: []
    },
    {
      name: "CZWARTEK",
      date: "2017-04-06",
      events: []
    },
    {
      name: "PIĄTEK",
      date: "2017-04-07",
      events: []
    },
    {
      name: "WEEKEND",
      date: "2017-04-08/2017-04-09",
      events: []
    }
  ];

  whatTime = Observable.interval(1000).map(x => new Date()).share();

  constructor(private dataProvider: DataproviderService) {}

  ngOnInit() {
  }

}
