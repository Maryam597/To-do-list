import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Auth } from '../auth/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';



interface Task {
  id: number;
  title: string;
  dueDate: Date;
  description?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [    
    CommonModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule, 
    DatePipe
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  auth = inject(Auth);
  today: Date = new Date();
  private readonly todayBase = new Date();

  selectedDate: Date = new Date();

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  tasks: Task[] = [
    { id: 1, title: 'Arroser les plantes', dueDate: new Date('2025-07-22') },
    { id: 2, title: 'Récolter les tomates', dueDate: new Date('2025-07-22') },
    { id: 3, title: 'Planter les graines de tournesol', dueDate: new Date('2025-07-21') },
    { id: 4, title: 'Préparer la serre', dueDate: new Date('2025-07-20') },
    // ...
  ];

  get isYesterday(): boolean {
    return this.diffInDays(this.today, this.todayBase) === -1;
  }
  get isToday(): boolean {
    return this.diffInDays(this.today, this.todayBase) === 0;
  }
  get isTomorrow(): boolean {
    return this.diffInDays(this.today, this.todayBase) === 1;
  }

  changeDay(offset: number) {
    const newDate = new Date(this.today);
    newDate.setDate(newDate.getDate() + offset);
    const diff = this.diffInDays(newDate, this.todayBase);
    if (diff >= -1 && diff <= 1) {
      this.today = newDate;
      this.selectedDate = newDate;
    }
  }

  private diffInDays(d1: Date, d2: Date): number {
    const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const diffTime = date1.getTime() - date2.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }


  get tasksForSelectedDate(): Task[] {
    return this.tasks.filter(task => 
      task.dueDate.getFullYear() === this.selectedDate.getFullYear() &&
      task.dueDate.getMonth() === this.selectedDate.getMonth() &&
      task.dueDate.getDate() === this.selectedDate.getDate()
    );
  }

  get lastTasks(): Task[] {
    const sorted = this.tasks.slice().sort((a,b) => b.id - a.id);
    return sorted.slice(0, 3);
  }

  onDateChange(event: any): void {
  this.today = event.value;
}

}
