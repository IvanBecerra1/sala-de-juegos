import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonballzComponent } from './dragonballz.component';

describe('DragonballzComponent', () => {
  let component: DragonballzComponent;
  let fixture: ComponentFixture<DragonballzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragonballzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragonballzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
