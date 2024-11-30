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

type Schedule = Record<number, string[]>;

@Component({
  selector: 'app-schedule',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, TaskCardComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent {
  tasks: Task[] = [
    {
      title: 'Morning Meeting',
      content: 'Discuss project goals and tasks for the day.',
      startTime: '2024-12-01T09:00:00',
      duration: 60, // 1 hour
    },
    {
      title: 'Code Review',
      content: 'Review the latest pull requests and provide feedback.',
      startTime: '2024-12-01T11:00:00',
      duration: 90, // 1.5 hours
    },
    {
      title: 'Lunch Break',
      content: 'Take a break for lunch and relaxation.',
      startTime: '2024-12-01T12:30:00',
      duration: 60, // 1 hour
    },
    {
      title: 'Client Presentation',
      content: 'Present the latest project update to the client.',
      startTime: '2024-12-01T14:00:00',
      duration: 120, // 2 hours
    },
    {
      title: 'Team Sync-Up',
      content: 'Discuss project progress and any blockers with the team.',
      startTime: '2024-12-01T16:00:00',
      duration: 30, // 30 minutes
    },
  ];

  // Define working hours with some buffer for overtime (8 AM to 8 PM)
  hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 to 20

  schedule: Schedule = {
    8: [],
    9: ['Morning Meeting'],
    10: [],
    11: ['Code Review'],
    12: [],
    13: ['Lunch Break'],
    14: ['Client Presentation'],
    15: [],
    16: ['Team Sync-Up'],
    17: [],
    18: [],
    19: [],
    20: [],
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
