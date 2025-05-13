import { TestBed } from '@angular/core/testing';

import { GuardarResultadoService } from './guardar-resultado.service';

describe('GuardarResultadoService', () => {
  let service: GuardarResultadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarResultadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
