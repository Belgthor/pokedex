import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinyDex } from './shiny-dex';

describe('ShinyDex', () => {
  let component: ShinyDex;
  let fixture: ComponentFixture<ShinyDex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShinyDex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShinyDex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
