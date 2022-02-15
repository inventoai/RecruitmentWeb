import { TestBed } from '@angular/core/testing';

import { WorkAllocationService } from './work-allocation.service';

describe('WorkAllocationService', () => {
  let service: WorkAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
