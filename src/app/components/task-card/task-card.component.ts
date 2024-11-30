import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;

  protected formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const checkedHours = hours > 0 ? `${hours} h` : '';
    const checkedMinutes =
      remainingMinutes > 0 ? `${remainingMinutes} min` : '';
    return `${checkedHours} ${checkedMinutes}`;
  }
}
