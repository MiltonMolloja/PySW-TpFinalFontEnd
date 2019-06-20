import { TestBed } from '@angular/core/testing';

import { ServPerfilService } from './serv-perfil.service';

describe('ServPerfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServPerfilService = TestBed.get(ServPerfilService);
    expect(service).toBeTruthy();
  });
});
