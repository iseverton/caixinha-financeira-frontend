import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { SummaryCard } from './summary-card/summary-card';
import { GoalService } from '../../../core/goal-service';

@Component({
  selector: 'app-summary-list',
  imports: [SummaryCard],
  templateUrl: './summary-list.html',
  styleUrl: './summary-list.css',
})
export class SummaryList implements OnInit {
  ngOnInit(): void {
    this.getTotalSaved();
    this.getTotalGoals();
    this.getActiveGoals();
  }

  protected goalservice = inject(GoalService);

  change = input.required();

  totalSaved = signal<number>(0);
  totalGoal = signal<number>(0);
  activeGoals = signal<number>(0);

  update() {
    if (this.change()) {
      this.getActiveGoals();
      this.getTotalGoals();
      this.getTotalSaved();
      console.log('chegou no summary list');
    }
    return;
  }

  getTotalSaved() {
    this.goalservice.getTotalSaved().subscribe({
      next: (data) => {
        this.totalSaved.set(data.totalAmountSaved), console.log(this.totalSaved());
      },
    });
  }

  getTotalGoals() {
    this.goalservice.getTotalGoals().subscribe({
      next: (data) => {
        this.totalGoal.set(data.totalGoalAmount);
      },
    });
  }

  getActiveGoals() {
    this.goalservice.getActiveGoals().subscribe({
      next: (data) => {
        this.activeGoals.set(data.activeGoalsCount), console.log(this.activeGoals());
      },
    });
  }
}
