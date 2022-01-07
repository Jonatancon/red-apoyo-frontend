import { TestBed } from '@angular/core/testing';

import { CalificacionUsuarioService } from './calificacion-usuario.service';

describe('CalificacionUsuarioService', () => {
  let service: CalificacionUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
