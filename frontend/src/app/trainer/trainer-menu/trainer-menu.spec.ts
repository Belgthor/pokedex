import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerMenu } from './trainer-menu';

describe('TrainerMenu', () => {
  let component: TrainerMenu;
  let fixture: ComponentFixture<TrainerMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
