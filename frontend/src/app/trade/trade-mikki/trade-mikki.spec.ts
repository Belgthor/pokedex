import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeMikki } from './trade-mikki';

describe('TradeMikki', () => {
  let component: TradeMikki;
  let fixture: ComponentFixture<TradeMikki>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeMikki]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeMikki);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
