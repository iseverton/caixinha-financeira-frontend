import { Component, inject, input, OnInit, output, Output, signal } from '@angular/core';
import { GoalCard } from '../goal-card/goal-card';
import { Observable, single } from 'rxjs';
import { goal } from '../../../shared/components/models/goal';
import { GoalService } from '../../../core/goal-service';
import { AsyncPipe } from '@angular/common';
import { GoalRegister } from '../goal-register/goal-register';

@Component({
  selector: 'app-goal-list',
  imports: [GoalCard, GoalRegister],
  templateUrl: './goal-list.html',
  styleUrl: './goal-list.css',
})
export class GoalList implements OnInit {
  protected goals = signal<goal[]>([]);

  protected goalService = inject(GoalService);

  hasChange = output<boolean>();

  ngOnInit(): void {
    this.get();
  }

  registerBox = signal(false);

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

  get() {
    this.goalService.listAllGoals().subscribe({
      next: (data) => this.goals.set(data),
    });
  }

  register(goal: goal) {
    this.goalService.CreateGoal(goal).subscribe({
      next: (data) => {
        this.closeRegisterBox(),
          this.goals.update((goals) => [...goals, data]),
          this.hasChange.emit(true);
      },
    });
  }
}
