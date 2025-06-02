import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authJuegosGuard } from './auth-juegos.guard';

describe('authJuegosGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authJuegosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
