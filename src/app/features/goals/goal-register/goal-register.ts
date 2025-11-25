import { Component, output, signal } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { goal } from '../../../shared/components/models/goal';

@Component({
  selector: 'app-goal-register',
  imports: [FormsModule],
  templateUrl: './goal-register.html',
  styleUrl: './goal-register.css',
})
export class GoalRegister {
  openModel = signal(false);
  registerModel = output<goal>();

  goal: goal = {
    name: '',
    targetDate: new Date(),
    targetAmount: null,
    currentAmount: null,
    description: '',
  };

  submit(form: any) {
    console.log('envou os dados:', this.goal);
    if (form.invalid) return;
    this.registerModel.emit(this.goal);
  }
}
