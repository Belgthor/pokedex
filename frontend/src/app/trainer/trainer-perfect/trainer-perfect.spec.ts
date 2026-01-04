import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPerfect } from './trainer-perfect';

describe('TrainerPerfect', () => {
  let component: TrainerPerfect;
  let fixture: ComponentFixture<TrainerPerfect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerPerfect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerPerfect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
