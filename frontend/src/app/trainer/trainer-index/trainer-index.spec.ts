import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerIndex } from './trainer-index';

describe('TrainerIndex', () => {
  let component: TrainerIndex;
  let fixture: ComponentFixture<TrainerIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
