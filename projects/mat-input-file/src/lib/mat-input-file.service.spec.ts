import { TestBed } from '@angular/core/testing';

import { MatInputFileService } from './mat-input-file.service';

describe('MatInputFileService', () => {
  let service: MatInputFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatInputFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
