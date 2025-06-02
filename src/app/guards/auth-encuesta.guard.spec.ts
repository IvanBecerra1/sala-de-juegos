import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authEncuestaGuard } from './auth-encuesta.guard';

describe('authEncuestaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authEncuestaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
