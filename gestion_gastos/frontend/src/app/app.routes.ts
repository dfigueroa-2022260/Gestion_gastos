import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'gastos',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/gastos/gastos.routes').then((m) => m.GASTOS_ROUTES),
  },
  { path: '**', redirectTo: 'login' },
];
