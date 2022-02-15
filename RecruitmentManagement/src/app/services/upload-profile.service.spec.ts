import { TestBed } from '@angular/core/testing';

import { UploadProfileService } from './upload-profile.service';

describe('UploadProfileService', () => {
  let service: UploadProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
