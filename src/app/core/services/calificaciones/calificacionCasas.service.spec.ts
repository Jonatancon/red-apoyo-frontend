import { TestBed } from '@angular/core/testing';

import { CalificacionCasasService } from './calificacionCasas.service';

describe('CasasService', () => {
  let service: CalificacionCasasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionCasasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
