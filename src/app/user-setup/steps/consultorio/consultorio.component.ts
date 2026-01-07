import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../../core/services/wizard.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wizard-consultorio',
  templateUrl: './consultorio.component.html',
  styleUrl: './consultorio.component.css'
})
export class ConsultorioComponent implements OnInit {

  /**
   * Subformulario "consultorio" dentro del formulario raíz del wizard.
   * Es el grupo: configForm.get('consultorio')
   */
  consultorioForm!: FormGroup;

  constructor(private wizardService: WizardService) {}

  ngOnInit(): void {
    // Obtenemos el formulario raíz desde el WizardService
    // y luego el subgrupo "consultorio".
    const rootForm = this.wizardService.wizardForm as FormGroup;
    this.consultorioForm = rootForm.get('consultorio') as FormGroup;
  }

  /**
   * Botón "Regresar".
   * No navega directamente, solo notifica al WizardService
   * y el ABUELO es quien realmente cambia de paso.
   */
  // onBack(): void {
  //   this.wizardService.prevStep();
  // }

}
