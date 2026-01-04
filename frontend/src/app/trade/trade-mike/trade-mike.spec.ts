import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeMike } from './trade-mike';

describe('TradeMike', () => {
  let component: TradeMike;
  let fixture: ComponentFixture<TradeMike>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeMike]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeMike);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
