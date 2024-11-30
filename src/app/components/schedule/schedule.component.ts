import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../models/task';

@Component({
  selector: 'app-schedule',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, TaskCardComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent {
  tasks: Task[] = [
    // Define tasks as before
  ];

  // Define working hours with 30-minute intervals
  hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 to 20

  // Updated schedule object for 30-minute intervals
  schedule: Record<string, string[]> = {
    '8_00': [],
    '8_30': [],
    '9_00': ['Morning Meeting'],
    '9_30': [],
    '10_00': [],
    '10_30': [],
    '11_00': ['Code Review'],
    '11_30': [],
    '12_00': [],
    '12_30': ['Lunch Break'],
    '13_00': [],
    '13_30': [],
    '14_00': ['Client Presentation'],
    '14_30': [],
    '15_00': [],
    '15_30': [],
    '16_00': ['Team Sync-Up'],
    '16_30': [],
    '17_00': [],
    '17_30': [],
    '18_00': [],
    '18_30': [],
    '19_00': [],
    '19_30': [],
    '20_00': [],
    '20_30': [],
  };

  protected drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
