import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerShiny } from './trainer-shiny';

describe('TrainerShiny', () => {
  let component: TrainerShiny;
  let fixture: ComponentFixture<TrainerShiny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerShiny]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerShiny);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
