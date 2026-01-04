import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDex } from './trade-dex';

describe('TradeDex', () => {
  let component: TradeDex;
  let fixture: ComponentFixture<TradeDex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeDex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeDex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
