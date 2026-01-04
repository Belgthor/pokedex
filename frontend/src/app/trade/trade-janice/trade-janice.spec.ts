import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeJanice } from './trade-janice';

describe('TradeJanice', () => {
  let component: TradeJanice;
  let fixture: ComponentFixture<TradeJanice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeJanice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeJanice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
