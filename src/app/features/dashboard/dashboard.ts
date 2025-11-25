import { Component, inject, OnInit, signal } from '@angular/core';
import { GoalList } from '../goals/goal-list/goal-list';
import { GoalRegister } from '../goals/goal-register/goal-register';
import { GoalService } from '../../core/goal-service';
import { goal } from '../../shared/components/models/goal';
import { Observable } from 'rxjs';
import { SummaryList } from './summary-list/summary-list';
import { SummaryCard } from './summary-list/summary-card/summary-card';

@Component({
  selector: 'app-dashboard',
  imports: [GoalList, SummaryCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  ngOnInit(): void {
    this.getTotalSaved();
    this.getTotalGoals();
    this.getActiveGoals();
  }

  haschange = signal(false);

  onChange(change: any) {
    this.getActiveGoals();
    this.getTotalGoals();
    this.getTotalSaved();
  }

  protected goalservice = inject(GoalService);

  totalSaved = signal<number>(0);
  totalGoal = signal<number>(0);
  activeGoals = signal<number>(0);

  getTotalSaved() {
    this.goalservice.totalSaved().subscribe({
      next: (data) => {
        this.totalSaved.set(data.totalAmountSaved), console.log(this.totalSaved());
      },
    });
  }

  getTotalGoals() {
    this.goalservice.totalGoals().subscribe({
      next: (data) => {
        this.totalGoal.set(data.totalGoalAmount);
      },
    });
  }

  getActiveGoals() {
    this.goalservice.GetActiveGoals().subscribe({
      next: (data) => {
        this.activeGoals.set(data.activeGoalsCount), console.log(this.activeGoals());
      },
    });
  }
}
