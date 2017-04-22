import { TestBed, inject } from '@angular/core/testing';

import { DataproviderService } from './dataprovider.service';
import {HttpModule} from "@angular/http";
import {Event} from "../models/event";
import {Task} from "../models/task";

describe('DataproviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataproviderService],
      imports: [HttpModule]
    });
  });

  it('should add event', inject([DataproviderService], (sut: DataproviderService) => {
    let newEvent = new Event(1, 'name', 0, '2017-30-20', false, []);
    sut.addEvent(newEvent);
    expect(sut.plan.length).toEqual(1);
  }));

  it('should add task', inject([DataproviderService], (sut: DataproviderService) => {
    let newTask = new Task(3, 2, 'Testing task name', 0, 0);
    sut.addTask(newTask);
    //TODO:
  }));

  it('should edit task', inject([DataproviderService], (sut: DataproviderService) => {
    let editedTask = sut.plan[0].events[0].tasks[0];
    let newTaskName = 'Testing task name UPDATED';
    editedTask.name = newTaskName;
    sut.editTask(editedTask);
    expect(sut.plan[0].events[0].tasks[0].name).toEqual(newTaskName);     //TODO: it's awful an what is more ... it doesn't work. I'm not proud of it :(
  }));

});
