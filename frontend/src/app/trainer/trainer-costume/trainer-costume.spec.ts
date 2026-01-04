import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCostume } from './trainer-costume';

describe('TrainerCostume', () => {
  let component: TrainerCostume;
  let fixture: ComponentFixture<TrainerCostume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerCostume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerCostume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
