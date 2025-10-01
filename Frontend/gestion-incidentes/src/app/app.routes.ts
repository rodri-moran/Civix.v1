import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { CitizenDashboard } from './components/dashboards/citizen-dashboard';
import { ReportarIncidente } from './components/reportIncident/reportar-incidente';
import { MisReportes } from './components/misReportes/mis-reportes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register},
  { path: 'citizen-dashboard', component: CitizenDashboard},
  { path: 'reportar-incidente', component: ReportarIncidente},
  { path: 'mis-reportes', component: MisReportes}
];