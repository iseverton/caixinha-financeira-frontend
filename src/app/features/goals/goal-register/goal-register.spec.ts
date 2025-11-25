import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalRegister } from './goal-register';

describe('GoalRegister', () => {
  let component: GoalRegister;
  let fixture: ComponentFixture<GoalRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
