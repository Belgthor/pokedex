import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeViewLucky } from './trade-view-lucky';

describe('TradeViewLucky', () => {
  let component: TradeViewLucky;
  let fixture: ComponentFixture<TradeViewLucky>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeViewLucky]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeViewLucky);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
