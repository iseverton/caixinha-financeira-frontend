import { Component, output } from '@angular/core';
import { GoalDeposit } from './goal-deposit';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-goal-deposit-form',
  imports: [FormsModule],
  templateUrl: './goal-deposit-form.html',
  styleUrl: './goal-deposit-form.css',
})
export class GoalDepositForm {
  depositModel = output<GoalDeposit>();

  model: GoalDeposit = {
    amount: null,
    description: '',
    dateTrasition: new Date(),
  };

  submit(form: any) {
    if (form.invalid) return;
    this.depositModel.emit(this.model);
  }
}
