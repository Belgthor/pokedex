import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDex } from './trainer-dex';

describe('TrainerDex', () => {
  let component: TrainerDex;
  let fixture: ComponentFixture<TrainerDex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerDex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerDex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
