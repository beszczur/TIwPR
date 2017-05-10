import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {WeekComponent} from './week.component';
import {TaskModalComponent} from '../task-modal/task-modal.component';
import {EventModalComponent} from "../event-modal/event-modal.component";
import {TaskComponent} from "../task/task.component";
import {DayComponent} from "../day/day.component";
import {EventComponent} from "../event/event.component";
import {ToastComponent, ToasterContainerComponent, ToasterService} from "angular2-toaster";

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;
  let dataProviderSpy;

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
      providers: [ToasterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    dataProviderSpy = jasmine.createSpyObj('dataProvider', ['getWeekPlan']);

    component = new WeekComponent(dataProviderSpy);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {

    it('NEGATIVE CASE', () => {
      // TODO: prepare negative case
    });

    it('should get data from data provider', () => {

      component.ngOnInit();

      expect(dataProviderSpy.getWeekPlan).toHaveBeenCalled();
    })
  })
});


/*
 beforeEach
 //spyOn(dataProvider, 'getWeekPlan').and.callThrough();
 //dataProvider = {getWeekPlan() {return 1;}};

 //sut = fixture.componentInstance;


 // var fakePerson = new Person();
 // spyOn(fakePerson, "sayHello");
 // fakePerson.helloSomeone("world");
 // expect(fakePerson.sayHello).toHaveBeenCalled();

 // var dataProviderMock = new DataproviderService(Http);
 // spyOn(dataProviderMock, '');
 // expect(1).toBe(1);

 //spyOn(dataProvider, 'getWeekPlan');
 */
