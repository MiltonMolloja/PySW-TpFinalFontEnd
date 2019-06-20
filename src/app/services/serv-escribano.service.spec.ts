import { TestBed } from '@angular/core/testing';

import { ServEscribanoService } from './serv-escribano.service';

describe('ServEscribanoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServEscribanoService = TestBed.get(ServEscribanoService);
    expect(service).toBeTruthy();
  });
});
