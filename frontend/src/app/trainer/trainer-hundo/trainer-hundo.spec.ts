import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerHundo } from './trainer-hundo';

describe('TrainerHundo', () => {
  let component: TrainerHundo;
  let fixture: ComponentFixture<TrainerHundo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerHundo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerHundo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
