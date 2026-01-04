import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeIndex } from './trade-index';

describe('TradeIndex', () => {
  let component: TradeIndex;
  let fixture: ComponentFixture<TradeIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
