import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarJuegoComponent } from './cerrar-juego.component';

describe('CerrarJuegoComponent', () => {
  let component: CerrarJuegoComponent;
  let fixture: ComponentFixture<CerrarJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CerrarJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
