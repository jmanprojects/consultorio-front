import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { UserSetupRoutingModule } from './user-setup-routing.module';
import { PasswordComponent } from './steps/password/password.component';
import { PersonalComponent } from './steps/personal/personal.component';
import { ConsultorioComponent } from './steps/consultorio/consultorio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReviewComponent } from './steps/review/review.component';
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserSetupComponent,
    PasswordComponent,
    PersonalComponent,
    ConsultorioComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    // HttpClientModule,
    UserSetupRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class UserSetupModule { }
