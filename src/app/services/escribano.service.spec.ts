import { TestBed } from '@angular/core/testing';

import { EscribanoService } from './escribano.service';

describe('EscribanoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscribanoService = TestBed.get(EscribanoService);
    expect(service).toBeTruthy();
  });
});
