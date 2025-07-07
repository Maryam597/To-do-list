import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']  // Laisse comme ça si le fichier est bien là
})
export class TodoComponent {
  tasks = [
    { title: 'Prep liste', done: false },
    { title: `Ajouter bouton d'ajout`, done: false },
    { title: 'Faire un commit ', done: false }
  ];

  newTask = '';

  addTask() {
    console.log("Ajout d'une tâche : ", this.newTask); // Ajoute ce log
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, done: false });
      this.newTask = '';
    }
  }
}
