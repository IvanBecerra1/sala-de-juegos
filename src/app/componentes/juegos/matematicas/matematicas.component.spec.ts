import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatematicasComponent } from './matematicas.component';

describe('MatematicasComponent', () => {
  let component: MatematicasComponent;
  let fixture: ComponentFixture<MatematicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatematicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatematicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
