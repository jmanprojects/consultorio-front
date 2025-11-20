import { Component } from '@angular/core';
import { WizardService } from '../../../core/services/wizard.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

    form: FormGroup | undefined = new FormGroup({});
    passwordForm!: FormGroup;

  constructor(private wizardService:WizardService, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.wizardService.wizardForm;
    this.passwordForm = this.form?.get('password') as FormGroup;
  }

  onSubmit() {
    console.log('aqui dando click');
    if (this.passwordForm?.valid) {
      console.log('listo');
      this.wizardService.nextStep();
    } else {
      this.passwordForm?.markAllAsTouched();
    }
  }
  // form = this.wizardService.wizardForm;
  // passwordForm = this.form?.get('password') as FormGroup;

}
