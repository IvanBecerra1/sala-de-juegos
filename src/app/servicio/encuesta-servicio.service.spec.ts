import { TestBed } from '@angular/core/testing';

import { EncuestaServicioService } from './encuesta-servicio.service';

describe('EncuestaServicioService', () => {
  let service: EncuestaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
