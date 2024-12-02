import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-list',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-list.component.html',
  styleUrl: './navigation-list.component.css',
})
export class NavigationListComponent {
  readonly links = [
    {
      heading: 'Schedules',
      path: 'schedules',
      icon: 'calendar_month',
    },
    {
      heading: 'Tasks',
      path: 'tasks',
      icon: 'list_alt',
    },
    {
      heading: 'Engineers',
      path: 'engineers',
      icon: 'engineering',
    },
  ];
}
