import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';

describe('BackEndService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });


});
