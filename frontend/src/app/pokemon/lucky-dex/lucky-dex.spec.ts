import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyDex } from './lucky-dex';

describe('LuckyDex', () => {
  let component: LuckyDex;
  let fixture: ComponentFixture<LuckyDex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuckyDex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuckyDex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
