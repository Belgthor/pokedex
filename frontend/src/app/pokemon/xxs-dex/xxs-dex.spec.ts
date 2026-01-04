import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XxsDex } from './xxs-dex';

describe('XxsDex', () => {
  let component: XxsDex;
  let fixture: ComponentFixture<XxsDex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XxsDex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XxsDex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
