import { TestBed } from '@angular/core/testing';

import { MatInputNumberService } from './mat-input-number.service';

describe('MatInputNumberService', () => {
  let service: MatInputNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatInputNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
