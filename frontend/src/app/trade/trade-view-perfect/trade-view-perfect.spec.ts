import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeViewPerfect } from './trade-view-perfect';

describe('TradeViewPerfect', () => {
  let component: TradeViewPerfect;
  let fixture: ComponentFixture<TradeViewPerfect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeViewPerfect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeViewPerfect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
