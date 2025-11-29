import { Component } from '@angular/core';
import { WizardService } from '../../../core/services/wizard.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

    // form: FormGroup | undefined = new FormGroup({});
    passwordForm!: FormGroup;
    showForm: boolean = true;

  constructor(private wizardService:WizardService){}

  ngOnInit(): void {
    if(this.wizardService.getStatusPassword()){
      this.showForm = false;
    }
    const rootForm = this.wizardService.wizardForm as FormGroup;
    this.passwordForm = rootForm.get('password') as FormGroup;

  }

  onSubmit() {
    // console.log('aqui dando click');
    if (this.passwordForm?.valid) {
      // console.log('listo');
      this.wizardService.nextStep();
    } else {
      this.passwordForm?.markAllAsTouched();
    }
  }

  onNext(){
        this.wizardService.nextStep();
    }

  // form = this.wizardService.wizardForm;
  // passwordForm = this.form?.get('password') as FormGroup;

}
