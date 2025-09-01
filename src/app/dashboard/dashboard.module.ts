import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ResumenComponent } from './resumen/resumen.component';
import { KpiComponent } from './kpi/kpi.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ResumenComponent,
    KpiComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
