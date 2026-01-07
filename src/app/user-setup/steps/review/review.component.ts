import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'wizard-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  personalForm!: FormGroup;
  consultorioForm!: FormGroup;

  constructor(private wizardService: WizardService) {}

  ngOnInit(): void {
    const rootForm = this.wizardService.wizardForm as FormGroup;

    this.personalForm = rootForm.get('personal') as FormGroup;
    this.consultorioForm = rootForm.get('consultorio') as FormGroup;
  }

  /**
   * Botón para regresar al paso anterior (datos del consultorio).
   */
  // onBack(): void {
  //   this.wizardService.prevStep();
  // }

  /**
   * Botón para confirmar y guardar.
   * Solo notifica al WizardService que queremos avanzar;
   * el ABUELO, en el paso 4, ejecutará submitFinalStep().
   */
  // onConfirm(): void {
  //   this.wizardService.nextStep();
  // }

}
