import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { GoalCard } from '../goal-card/goal-card';
import { goal } from '../../../shared/components/models/goal';
import { GoalService } from '../../../core/goal-service';
import { GoalRegister } from '../goal-register/goal-register';
import { CreateGoal } from '../goal-register/create-goal';

@Component({
  selector: 'app-goal-list',
  imports: [GoalCard, GoalRegister],
  templateUrl: './goal-list.html',
  styleUrl: './goal-list.css',
})
export class GoalList implements OnInit {
  hasChange = output<boolean>();

  protected goalsList = signal<goal[]>([]);

  isRegisterBoxOpen = signal(false);

  protected goalService = inject(GoalService);

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals() {
    this.goalService.getAllGoals().subscribe({
      next: (data) => this.goalsList.set(data),
    });
  }

  openRegisterBox() {
    this.isRegisterBoxOpen.set(true);
  }

  closeRegisterBox() {
    this.isRegisterBoxOpen.set(false);
  }

  createGoal(goal: CreateGoal) {
    this.goalService.registerGoal(goal).subscribe({
      next: (data) => {
        this.closeRegisterBox(),
          this.goalsList.update((goals) => [...goals, data]),
          this.hasChange.emit(true);
      },
    });
  }

  handleGoalUpdated(updatedGoal: goal) {
    this.goalsList.update((list) => list.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
    this.hasChange.emit(true);
  }

  handleGoalDeleted(id: number | undefined) {
    this.goalsList.update((list) => list.filter((g) => g.id !== id));
    this.hasChange.emit(true);
  }
}
