import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TodoComponent,
    RouterModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  today: Date = new Date();
  private readonly todayBase = new Date(); // pour référence

  selectedDate: Date = new Date(); // Pour le Datepicker

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
    }
  }

  private diffInDays(d1: Date, d2: Date): number {
    const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const diffTime = date1.getTime() - date2.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.today = this.selectedDate;
    this.loadTasksForDate(this.selectedDate);
  }

  loadTasksForDate(date: Date) {
    // 🔧 Tu brancheras ici l'appel à la BDD ou au service de tâches
    console.log("Charger les tâches pour :", date);
  }
}
