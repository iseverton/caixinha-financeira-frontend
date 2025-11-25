import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoalList } from "./features/goals/goal-list/goal-list";
import { Dashboard } from "./features/dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoalList, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DreamBox');
}
