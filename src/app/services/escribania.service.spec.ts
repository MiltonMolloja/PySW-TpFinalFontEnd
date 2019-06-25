import { TestBed } from '@angular/core/testing';

import { EscribaniaService } from './escribania.service';

describe('EscribaniaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscribaniaService = TestBed.get(EscribaniaService);
    expect(service).toBeTruthy();
  });
});
