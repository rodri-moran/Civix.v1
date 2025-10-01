import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { CitizenDashboard } from './components/dashboards/citizen-dashboard';
import { ReportarIncidente } from './components/reportIncident/reportar-incidente';
import { MisReportes } from './components/misReportes/mis-reportes';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register').then(m => m.Register) },
  { path: 'mis-reportes', loadComponent: () => import('./components/misReportes/mis-reportes').then(m => m.MisReportes), canActivate: [AuthGuard] },
  { path: 'reportar', loadComponent: () => import('./components/reportIncident/reportar-incidente').then(m => m.ReportarIncidente), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];