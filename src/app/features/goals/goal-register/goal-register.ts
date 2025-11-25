import { Component, output, signal } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { goal } from '../../../shared/components/models/goal';
import { CreateGoal } from './create-goal';

@Component({
  selector: 'app-goal-register',
  imports: [FormsModule],
  templateUrl: './goal-register.html',
  styleUrl: './goal-register.css',
})
export class GoalRegister {
  registerModel = output<CreateGoal>();
  openModel = signal<boolean>(false);

  goal: CreateGoal = {
    name: null,
    targetDate: null,
    targetAmount: null,
  };

  submit(form: any) {
    console.log('envou os dados:', this.goal);
    if (form.invalid) return;
    this.registerModel.emit(this.goal);
  }
}
