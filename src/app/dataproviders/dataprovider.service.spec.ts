import { TestBed, inject } from '@angular/core/testing';

import { DataproviderService } from './dataprovider.service';

describe('DataproviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataproviderService]
    });
  });

  it('should ...', inject([DataproviderService], (service: DataproviderService) => {
    expect(service).toBeTruthy();
  }));
});
