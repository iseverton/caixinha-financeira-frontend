import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { goal } from '../../../shared/components/models/goal';
import { CurrencyPipe } from '@angular/common';
import { GoalService } from '../../../core/goal-service';
import { GoalDepositForm } from './goal-deposit-form/goal-deposit-form';

@Component({
  selector: 'app-goal-card',
  imports: [CurrencyPipe, GoalDepositForm],
  templateUrl: './goal-card.html',
  styleUrl: './goal-card.css',
})
export class GoalCard implements OnInit {
  protected goalservice = inject(GoalService);

  goal = input.required<goal>();
  updated = output<goal>();

  showModal = signal(false);

  showadicionar() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  porcent = computed(() => this.calcularPorcent());

  calcularPorcent() {
    const goal = this.goal();
    const porcent = ((goal?.currentAmount ?? 0) / (goal?.targetAmount ?? 1)) * 100;
    return Number(porcent.toFixed(2));
  }

  deposit(model: any) {
    this.goalservice.Deposit(this.goal().id, model).subscribe({
      next: (data) => {
        console.log(data);
        this.updated.emit(data);
        this.closeModal();
      },
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
