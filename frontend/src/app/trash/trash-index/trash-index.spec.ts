import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashIndex } from './trash-index';

describe('TrashIndex', () => {
  let component: TrashIndex;
  let fixture: ComponentFixture<TrashIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
