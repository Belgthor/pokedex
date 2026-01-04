import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDarryl } from './trade-darryl';

describe('TradeDarryl', () => {
  let component: TradeDarryl;
  let fixture: ComponentFixture<TradeDarryl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeDarryl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeDarryl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
