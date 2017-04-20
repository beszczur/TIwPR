import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalComponent } from './task-modal.component';
import {DataproviderService} from "../../dataproviders/dataprovider.service";
import {HttpModule} from "@angular/http";
import {ToasterService} from "angular2-toaster";

describe('TaskModalComponent', () => {
  let sut: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskModalComponent ],
      providers: [DataproviderService, ToasterService],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModalComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
