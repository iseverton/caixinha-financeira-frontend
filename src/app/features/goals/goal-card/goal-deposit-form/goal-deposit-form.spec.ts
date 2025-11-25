import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDepositForm } from './goal-deposit-form';

describe('GoalDepositForm', () => {
  let component: GoalDepositForm;
  let fixture: ComponentFixture<GoalDepositForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalDepositForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDepositForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
