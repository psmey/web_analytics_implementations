import { Routes } from '@angular/router';
import { TechniciansComponent } from './pages/technicians/technicians.component';

export const routes: Routes = [
  { path: 'engineers', component: TechniciansComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
