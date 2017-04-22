import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import {By} from '@angular/platform-browser';
import {Task} from "../../models/task";

describe('TaskComponent', () => {
  let sut: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskEl;
  let expectedTask: Task;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    sut = fixture.componentInstance;
    taskEl = fixture.debugElement.query(By.css('task'));

    expectedTask = new Task(3, 2, 'Testing task name', 0, 0);
    sut.task = expectedTask;
    fixture.detectChanges();
  });

  it('should change task status', () => {
    expect(sut.task.status).toEqual(expectedTask.NEW);
    sut.changeState(expectedTask.DONE);
    expect(sut.task.status).toEqual(expectedTask.DONE);
  });

  it('should fill in task edit modal with task data', () =>{
    //TODO:
    sut.fillInTaskEditModal();
    expect(fixture.debugElement.query(By.css('#taskName'))).toContain(expectedTask.name);
  });
});
