import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeView } from './trade-view';

describe('TradeView', () => {
  let component: TradeView;
  let fixture: ComponentFixture<TradeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
