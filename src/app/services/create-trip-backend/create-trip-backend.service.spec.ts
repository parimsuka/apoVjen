import { TestBed } from '@angular/core/testing';

import { CreateTripBackendService } from './create-trip-backend.service';

describe('CreateTripBackendService', () => {
  let service: CreateTripBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTripBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
