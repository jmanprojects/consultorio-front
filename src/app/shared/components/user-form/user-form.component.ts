import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'shared-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() personalForm!: FormGroup;

  constructor(private wizardService: WizardService){}

  onSubmit() {

    // console.log(this.personalForm);
    if (this.personalForm?.valid) {
      console.log(this.personalForm);
      this.wizardService.nextStep();
    } else {
      this.personalForm?.markAllAsTouched();
    }
  }

}
