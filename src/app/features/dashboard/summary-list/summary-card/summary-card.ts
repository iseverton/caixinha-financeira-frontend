import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  title = input.required();
  value = input.required<number>();

  cor = input<string>();

  isCurrency = input<boolean | null>();

  
}
