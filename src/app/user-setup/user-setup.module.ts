import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { UserSetupRoutingModule } from './user-setup-routing.module';
import { PasswordComponent } from './steps/password/password.component';
import { PersonalComponent } from './steps/personal/personal.component';
import { ConsultorioComponent } from './steps/consultorio/consultorio.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserSetupComponent,
    PasswordComponent,
    PersonalComponent,
    ConsultorioComponent
  ],
  imports: [
    CommonModule,
    UserSetupRoutingModule,
    ReactiveFormsModule

  ]
})
export class UserSetupModule { }
