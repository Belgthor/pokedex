import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerXxl } from './trainer-xxl';

describe('TrainerXxl', () => {
  let component: TrainerXxl;
  let fixture: ComponentFixture<TrainerXxl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerXxl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerXxl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
