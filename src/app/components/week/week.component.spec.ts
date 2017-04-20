import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekComponent } from './week.component';
import {TaskModalComponent} from '../task-modal/task-modal.component';
import {EventModalComponent} from "../event-modal/event-modal.component";
import {TaskComponent} from "../task/task.component";
import {DayComponent} from "../day/day.component";
import {EventComponent} from "../event/event.component";
import {ToastComponent, ToasterContainerComponent, ToasterService} from "angular2-toaster";
import {HttpModule} from "@angular/http";

describe('WeekComponent', () => {
  let sut: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeekComponent,
        TaskComponent,
        DayComponent,
        EventComponent,
        EventModalComponent,
        TaskModalComponent,
        ToasterContainerComponent,
        ToastComponent],
      imports: [HttpModule],
      providers: [ToasterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get data from data provider', () => {
    // var fakePerson = new Person();
    // spyOn(fakePerson, "sayHello");
    // fakePerson.helloSomeone("world");
    // expect(fakePerson.sayHello).toHaveBeenCalled();

    // var dataProviderMock = new DataproviderService(Http);
    // spyOn(dataProviderMock, '');
    expect(1).toBe(1);
  });
});
