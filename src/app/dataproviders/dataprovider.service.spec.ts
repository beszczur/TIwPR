import { TestBed, inject } from '@angular/core/testing';

import { DataproviderService } from './dataprovider.service';
import {HttpModule} from "@angular/http";

describe('DataproviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataproviderService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([DataproviderService], (service: DataproviderService) => {
    expect(service).toBeTruthy();
  }));
});
