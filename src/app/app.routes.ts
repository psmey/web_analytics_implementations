import { Routes } from '@angular/router';
import { EngineersComponent } from './pages/engineers/engineers.component';

export const routes: Routes = [
  { path: 'engineers', component: EngineersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
