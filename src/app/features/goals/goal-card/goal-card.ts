import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { goal } from '../../../shared/components/models/goal';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { GoalService } from '../../../core/goal-service';
import { GoalDepositForm } from './goal-deposit-form/goal-deposit-form';
import { CreateGoal } from '../goal-register/create-goal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goal-card',
  imports: [CurrencyPipe, GoalDepositForm, DatePipe, FormsModule],
  templateUrl: './goal-card.html',
  styleUrl: './goal-card.css',
})
export class GoalCard implements OnInit {
  ngOnInit(): void {
    console.log(this.goal().targetDate);
  }
  goal = input.required<goal>();
  updated = output<goal>();
  deleted = output<number | undefined>();

  protected goalservice = inject(GoalService);

  amountRemaining = computed(() =>
    Math.max((this.goal().targetAmount ?? 0) - (this.goal().currentAmount ?? 0), 0)
  );

  porcent = computed(() => this.calculateProgressPercentage());

  protected isDepositModalOpen = signal<boolean>(false);
  protected isDeleteModalOpen = signal<boolean>(false);
  protected isUpdateModalOpen = signal<boolean>(false);

  updateGoal = computed<CreateGoal>(() => ({
    name: this.goal().name,
    targetAmount: this.goal().targetAmount,
    targetDate: this.formatToInputDate(this.goal().targetDate),
  }));

  formatToInputDate(date: any) {
    return date.split('T')[0];
  }

  submitGoalUpdate(goal: any) {
    this.goalservice.updateGoal(this.goal().id, this.updateGoal()).subscribe({
      next: (data) => {
        this.updated.emit(data);
        this.closeUpdateModal();
      },
    });
  }

  calculateProgressPercentage() {
    const goal = this.goal();
    const porcent = ((goal?.currentAmount ?? 0) / (goal?.targetAmount ?? 1)) * 100;
    return Number(porcent.toFixed(2));
  }

  makeDeposit(model: any) {
    this.goalservice.deposit(this.goal().id, model).subscribe({
      next: (data) => {
        console.log(data);
        this.updated.emit(data);
        this.closeDepositModal();
      },
    });
  }

  deleteGoal() {
    this.goalservice.deleteGoal(this.goal().id).subscribe({
      next: (data) => {
        this.deleted.emit(this.goal().id);
        this.isDeleteModalOpen.set(false);
      },
    });
  }

  // Controlar modals

  openDepositModal() {
    this.isDepositModalOpen.set(true);
    console.log(this.isDepositModalOpen());
  }

  closeDepositModal() {
    this.isDepositModalOpen.set(false);
  }

  openDeleteModal() {
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }

  openUpdateModal() {
    this.isUpdateModalOpen.set(true);
  }

  closeUpdateModal() {
    this.isUpdateModalOpen.set(false);
  }
}
