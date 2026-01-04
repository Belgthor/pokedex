import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTest } from './page-test';

describe('PageTest', () => {
  let component: PageTest;
  let fixture: ComponentFixture<PageTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
