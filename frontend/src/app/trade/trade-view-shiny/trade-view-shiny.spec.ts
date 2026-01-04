import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeViewShiny } from './trade-view-shiny';

describe('TradeViewShiny', () => {
  let component: TradeViewShiny;
  let fixture: ComponentFixture<TradeViewShiny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeViewShiny]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeViewShiny);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
