import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pacientes', loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule) }, { path: 'citas', loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule) }, { path: 'pagos', loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule) }, { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'reportes', loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
