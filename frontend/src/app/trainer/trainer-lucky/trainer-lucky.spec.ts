import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerLucky } from './trainer-lucky';

describe('TrainerLucky', () => {
  let component: TrainerLucky;
  let fixture: ComponentFixture<TrainerLucky>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerLucky]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerLucky);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
