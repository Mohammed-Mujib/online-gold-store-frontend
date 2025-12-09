import { Routes } from '@angular/router';
import { Home } from './home/home';
import path from 'path';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
];
