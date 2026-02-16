import { TestBed } from '@angular/core/testing';

import { CandidatureApiService } from './candidature-api.service';

describe('CandidatureApiService', () => {
  let service: CandidatureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
