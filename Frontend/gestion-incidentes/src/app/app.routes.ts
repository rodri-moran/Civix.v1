import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rutas públicas (sin layout)
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register').then(m => m.Register)
  },

  // Rutas del ciudadano (usan el CitizenDashboard como layout)
  {
    path: '',
    loadComponent: () => import('./components/layouts/citizen-layout/citizen-layout').then(m => m.CitizenLayoutComponent),
    children: [
      {
        path: 'mis-reportes',
        loadComponent: () => import('./components/misReportes/mis-reportes').then(m => m.MisReportes)
      },
      {
        path: 'reportar-incidente',
        loadComponent: () => import('./components/reportIncident/reportar-incidente').then(m => m.ReportarIncidente)
      },
      {
        path: '', // ruta principal (home del ciudadano)
        loadComponent: () => import('./components/citizen-home/citizen-home').then(m => m.CitizenHome)
      }
    ]
  },

  //  Rutas del administrador (usan el layout admin)
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-layout/admin-layout').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/dashboard/admin-dashboard-component/admin-dashboard-component')
          .then(m => m.AdminDashboardComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./components/admin/admin-reports/admin-reports')
          .then(m => m.AdminReports)
      },
      {
        path: 'cuadrillas',
        loadComponent: () => import('./components/admin/squads-component/squads-component.component')
          .then(m => m.SquadsComponentComponent)
      },
      {
        path: 'noticias',
        loadComponent: () => import('./components/admin/news/news.component')
          .then(m => m.NewsComponent)
      },
      {
        path: 'estadisticas',
        loadComponent: () => import('./components/admin/statistics/statistics.component')
          .then(m => m.StatisticsComponent)
      }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
