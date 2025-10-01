import { Routes } from '@angular/router';
export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register').then(m => m.Register) 
  },
  { 
    path: 'mis-reportes', 
    loadComponent: () => import('./components/misReportes/mis-reportes').then(m => m.MisReportes) 
  },
  { 
    path: 'reportar-incidente', 
    loadComponent: () => import('./components/reportIncident/reportar-incidente').then(m => m.ReportarIncidente)
  },
  { 
    path: 'citizen-dashboard', 
    loadComponent: () => import('./components/dashboards/citizen-dashboard').then(m => m.CitizenDashboard)
  }
];
