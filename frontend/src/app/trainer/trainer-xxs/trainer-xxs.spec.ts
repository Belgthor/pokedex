import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerXxs } from './trainer-xxs';

describe('TrainerXxs', () => {
  let component: TrainerXxs;
  let fixture: ComponentFixture<TrainerXxs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerXxs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerXxs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
