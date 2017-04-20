import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalComponent } from './event-modal.component';
import {HttpModule} from "@angular/http";
import {ToasterService} from "angular2-toaster";

describe('EventModalComponent', () => {
  let sut: EventModalComponent;
  let fixture: ComponentFixture<EventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventModalComponent],
      imports: [HttpModule],
      providers: [ToasterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModalComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
