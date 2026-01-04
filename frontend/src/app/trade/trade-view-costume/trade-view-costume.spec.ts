import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeViewCostume } from './trade-view-costume';

describe('TradeViewCostume', () => {
  let component: TradeViewCostume;
  let fixture: ComponentFixture<TradeViewCostume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeViewCostume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeViewCostume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
