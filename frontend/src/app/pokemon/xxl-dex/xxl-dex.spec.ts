import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XxlDex } from './xxl-dex';

describe('XxlDex', () => {
  let component: XxlDex;
  let fixture: ComponentFixture<XxlDex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XxlDex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XxlDex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
