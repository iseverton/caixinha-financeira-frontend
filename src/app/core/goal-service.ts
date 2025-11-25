import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { goal } from '../shared/components/models/goal';
import { Observable } from 'rxjs';
import { CreateGoal } from '../features/goals/goal-register/create-goal';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseurl: string = 'https://localhost:7283/api/goals/';
  private http = inject(HttpClient);

  CreateGoal(body: CreateGoal): Observable<goal> {
    return this.http.post<goal>(this.baseurl, body);
  }

  listAllGoals(): Observable<goal[]> {
    return this.http.get<goal[]>(this.baseurl);
  }

  Deposit(id: any, amount: number) {
    return this.http.post<goal>(this.baseurl + id + '/deposit', amount);
  }

  totalSaved() {
    return this.http.get<any>(this.baseurl + 'total');
  }

  totalGoals() {
    return this.http.get<any>(this.baseurl + 'total-goals');
  }

  GetActiveGoals() {
    return this.http.get<any>(this.baseurl + 'active-goals');
  }

  deleteGoal(id: any) {
    return this.http.delete(this.baseurl + id);
  }
}
