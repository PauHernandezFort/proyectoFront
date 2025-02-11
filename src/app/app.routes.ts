import { Routes } from '@angular/router';
import { CalendarioView } from './views/calendario/calendario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'calendario', pathMatch: 'full' },
  { path: 'calendario', component: CalendarioView },
  { path: '**', redirectTo: 'calendario' }
];
