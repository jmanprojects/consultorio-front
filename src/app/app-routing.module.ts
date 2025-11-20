import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { 
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch:'full'
      },
      {   
        path: 'pacientes', 
        loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule),},

        { path: 'citas', 
          loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule),
         
        },
        { path: 'pagos', 
          loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule),
          
        }, 
        { path: 'dashboard', 
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
          
        }, 
        { path: 'reportes', 
          loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) 
        },
        {
          path: 'user',
          loadChildren: () => import('./user/user.module').then(m => m.UserModule)
        },
        
        // {
        //   path: 'add-paciente', loadChildren:() => import('./pacientes/add-paciente')
        // }
        // {
        //   path: '**',
        //   redirectTo: 'dashboard'
        // }
    ]
  },
  {
    path: 'user-setup',
    loadChildren: () => import('./user-setup/user-setup.module').then(m => m.UserSetupModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// const routes: Routes = [
//   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//   { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
//   { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
// ];
