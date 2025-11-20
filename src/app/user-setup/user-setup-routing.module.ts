import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { PasswordComponent } from './steps/password/password.component';
import { PersonalComponent } from './steps/personal/personal.component';
import { ConsultorioComponent } from './steps/consultorio/consultorio.component';

const routes: Routes = [
  { path: '', component: UserSetupComponent,
    children: [
      {path: '', redirectTo: 'step-1', pathMatch: 'full'},
      {path: 'step-1', component:PasswordComponent},
      {path: 'step-2', component: PersonalComponent},
      {path: 'step-3', component: ConsultorioComponent}
    ]
  },
  // { path: 'add-paciente', component: AddPacienteComponent },
  // { path: ':id', component: PacienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSetupRoutingModule { }
