import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBelgthor } from './trainer-belgthor';

describe('TrainerBelgthor', () => {
  let component: TrainerBelgthor;
  let fixture: ComponentFixture<TrainerBelgthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerBelgthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerBelgthor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
