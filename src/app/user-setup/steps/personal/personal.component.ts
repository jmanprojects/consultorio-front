import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'wizard-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit {

  /**
   * Subformulario "personal" dentro del formulario raíz del wizard.
   * Es el grupo: configForm.get('personal')
   */
  personalForm!: FormGroup;

  constructor(private wizardService: WizardService) {}

  ngOnInit(): void {
    /**
     * Obtenemos el formulario raíz desde el WizardService
     * y luego el subgrupo "personal".
     */
    const rootForm = this.wizardService.wizardForm as FormGroup;
    this.personalForm = rootForm.get('personal') as FormGroup;
  }

  /**
   * Botón "Regresar".
   * No navega directamente: solo notifica al WizardService,
   * y el ABUELO es quien realmente hace el cambio de paso.
   */
  // onBack(): void {
  //   this.wizardService.prevStep();
  // }

}
