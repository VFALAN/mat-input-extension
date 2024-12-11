import { TestBed } from '@angular/core/testing';

import { MatInputExtensionService } from './mat-input-extension.service';

describe('MatInputExtensionService', () => {
  let service: MatInputExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatInputExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
