import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeMenu } from './trade-menu';

describe('TradeMenu', () => {
  let component: TradeMenu;
  let fixture: ComponentFixture<TradeMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
