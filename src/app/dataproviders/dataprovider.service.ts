import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Day} from '../models/day';
import {Task} from '../models/task';
import {Event} from '../models/event';

@Injectable()
export class DataproviderService {
  private address = '';

  public plan: any[] = [
    new Day(
      'MONDAY',
      '2017-04-24',
      [
        new Event (1, 'ZSK', 0, '2017-04-24', false,
          [
            new Task(1, 1, 'Zadanie 1 z konstruktora', 0, 0),
            new Task(2, 1, 'Zadanie 2 z konstruktora', 0, 1),
          ]),
        new Event (2, 'Angielski', 0, '2017-04-24', false,
          [
            new Task(3, 2, 'Zadanie 1A z konstruktora', 0, 0),
            new Task(4, 2, 'Zadanie 2A z konstruktora', 0, 1),
          ]),
      ]
    ),
    new Day(
      'TUESDAY',
      '2017-04-25',
      [
          new Event(3, 'Praca', 0, '2017-04-25', false,
            [
              new Task(5, 3, 'TASK 1C', 0, 0),
              new Task(6, 3, 'TASK 2C', 1, 1),
            ]
          ),
          new Event(4, 'NT4G', 0, '2017-04-25', false,
            [
              new Task(7, 4, 'Task 1A', 1, 0),
              new Task(8, 4, 'Task 2A', 0, 1),
            ]
          ),
      ]
    ),
    new Day(
      'WEDNESDAY',
      '2017-04-26',
      [
        new Event(17, 'BSI', 0, '2017-04-26', false, []),
      ]
    ),
    new Day('TUESDAY', '2017-04-27', []),
    new Day('FRIDAY', '2017-04-28', []),
    new Day('WEEKEND', '2017-04-29/2017-04-30',
      [
      new Event(5, 'Trip preparation', 0, '2017-04-29', false,
        [
          new Task(9, 5, 'packing', 0, 0),
          new Task(10, 5, 'bike cleaning', 0, 0),
        ]
      ),
    ]
  ),
  ];

  constructor() { }
  // private _http: Http)

  getWeekPlan(){
    return this.plan;
  }

  public addEvent(event : Event){
    for(var i=0; i<this.plan.length; i++)
    {
      if(this.plan[i].date == event.date)
      {
        this.plan[i].events.push(event);
        console.log(this.plan[i].events);
        return true;
      }
    }
    return false;
  }

  public addTask(task: Task)
  {
    for(var i=0; i<this.plan.length; i++)
    {
      var events= this.plan[i].events;
      for(var j=0; j<events.length; j++)
      {
        if(events[j].id === task.eventId)
        {
          this.plan[i].events[j].tasks.push(task);
          console.log(this.plan[i].events[j].tasks);
          return true;
        }
      }
    }
    return false;
  }

  public editTask(task: Task)
  {
    for(var i=0; i<this.plan.length; i++)
    {
      var events= this.plan[i].events;
      for(var j=0; j<events.length; j++)
      {
        if(events[j].id === task.eventId)
        {
          for(var k=0; k<events[j].tasks.length; k++)
          {
            if(events[j].tasks[k].id === task.id)
            {
              this.plan[i].events[j].tasks[k]=task;
              console.log(this.plan[i].events[j].tasks);
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  //getWeekPlan() {
    //return
    // let author = new Author(firstName, surname);
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // var requestoptions = new RequestOptions({
    //   method: RequestMethod.Post,
    //   url: this.address + 'searchNew/',
    //   headers: headers,
    //   body: JSON.stringify(author)
    // })
  //}

}
