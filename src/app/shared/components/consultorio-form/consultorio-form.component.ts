import { Component, Input } from '@angular/core';
import { WizardService } from '../../../core/services/wizard.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-consultorio-form',
  templateUrl: './consultorio-form.component.html',
  styleUrl: './consultorio-form.component.css'
})
export class ConsultorioFormComponent {

  @Input() consultorioForm!: FormGroup;
  
    constructor(private wizardService: WizardService){}
  
    onSubmit() {
  
      // console.log(this.personalForm);
      if (this.consultorioForm?.valid) {
        console.log(this.consultorioForm);
        this.wizardService.nextStep();
      } else {
        this.consultorioForm?.markAllAsTouched();
      }
    }

}
