import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashHundo } from './trash-hundo';

describe('TrashHundo', () => {
  let component: TrashHundo;
  let fixture: ComponentFixture<TrashHundo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashHundo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashHundo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
