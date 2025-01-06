import { Routes } from '@angular/router';
import { CallsComponent } from './pages/calls/calls.component';
import { ResourcesComponent } from './pages/resources/resources.component';

export const routes: Routes = [
  { path: '', redirectTo: 'calls', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent },
  { path: 'calls', component: CallsComponent },
];
