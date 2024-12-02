import { Routes } from '@angular/router';
import { TechniciansComponent } from './pages/technicians/technicians.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'engineers', component: TechniciansComponent },
];
