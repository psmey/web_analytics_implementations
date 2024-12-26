import { Routes } from '@angular/router';
import { ResourcesComponent } from './pages/resources/resources.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent },
];
