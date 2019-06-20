import { TestBed } from '@angular/core/testing';

import { ServUsuarioService } from './serv-usuario.service';

describe('ServUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServUsuarioService = TestBed.get(ServUsuarioService);
    expect(service).toBeTruthy();
  });
});
