import { Component, inject, input, OnInit, output, Output, signal } from '@angular/core';
import { GoalCard } from '../goal-card/goal-card';
import { Observable, single } from 'rxjs';
import { goal } from '../../../shared/components/models/goal';
import { GoalService } from '../../../core/goal-service';
import { AsyncPipe } from '@angular/common';
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

  protected goals = signal<goal[]>([]);
  registerBox = signal(false);

  protected goalService = inject(GoalService);

  ngOnInit(): void {
    this.get();
  }

  showregisterBox() {
    this.registerBox.set(true);
  }

  closeRegisterBox() {
    this.registerBox.set(false);
  }

  onGoalUpdated(goal: goal) {
    // this.goals$ = this.goalService.listAllGoals();

    this.goals.update((list) => list.map((g) => (g.id === goal.id ? goal : g)));
    this.hasChange.emit(true);
  }

  onGoalDeleted(id: number | undefined) {
    // remove o goal do array
    this.goals.update((list) => list.filter((g) => g.id !== id));
    // notifica o dashboard/summary que houve mudança
    this.hasChange.emit(true);
  }

  get() {
    this.goalService.listAllGoals().subscribe({
      next: (data) => this.goals.set(data),
    });
  }

  register(goal: CreateGoal) {
    this.goalService.CreateGoal(goal).subscribe({
      next: (data) => {
        this.closeRegisterBox(),
          this.goals.update((goals) => [...goals, data]),
          this.hasChange.emit(true);
      },
    });
  }
}
