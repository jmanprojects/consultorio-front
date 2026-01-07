import { Component, Input } from '@angular/core';
import { WizardService } from '../../../core/services/wizard.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-consultorio-form',
  templateUrl: './consultorio-form.component.html',
  styleUrl: './consultorio-form.component.css'
})
export class ConsultorioFormComponent {

  /**
   * FormGroup correspondiente a la sección "consultorio"
   * del formulario raíz del wizard.
   */
  @Input() consultorioForm!: FormGroup;

  /**
   * (Opcional) URL para previsualizar el logo seleccionado.
   */
  previewSrc: string | null = null;

  constructor(private wizardService: WizardService) {}

  /**
   * Maneja el envío del formulario de datos del consultorio.
   * Si es válido:
   *  - Notifica al WizardService que queremos avanzar.
   *  - El ABUELO se encargará de armar el FormData y llamar al backend.
   */
  // onSubmit(): void {
  //   if (this.consultorioForm?.valid) {
  //     this.consultorioForm.markAllAsTouched();
  //     this.wizardService.nextStep();
  //   } else {
  //     this.consultorioForm?.markAllAsTouched();
  //   }
  // }

  /**
   * Maneja el cambio en el input de archivo para el logotipo del consultorio.
   * Guarda el File en el control "clinic_logo".
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Guardamos el archivo en el formulario
    this.consultorioForm.get('clinic_logo')?.setValue(file);
    this.consultorioForm.get('clinic_logo')?.markAsDirty();
    this.consultorioForm.get('clinic_logo')?.markAsTouched();

    // (Opcional) Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
