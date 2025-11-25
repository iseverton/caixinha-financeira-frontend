import { Component, input } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  imports: [],
  templateUrl: './btn-primary.html',
  styleUrl: './btn-primary.css',
})
export class BtnPrimary {
  label = input();
  icon = input();
}
