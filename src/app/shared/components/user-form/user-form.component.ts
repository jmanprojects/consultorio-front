import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'shared-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  /**
   * FormGroup correspondiente a la sección "personal"
   * del formulario raíz del wizard.
   * Es inyectado desde el componente padre (PersonalComponent).
   */
  @Input() personalForm!: FormGroup;

  /**
   * (Opcional) URL para previsualizar la foto seleccionada.
   * Si quieres mostrar un <img>, puedes usarlo en el template.
   */
  previewSrc: string | null = null;

  constructor(private wizardService: WizardService) {}

  /**
   * Maneja el envío del formulario de datos personales.
   * Si el formulario es válido:
   *  - Notifica al WizardService que queremos avanzar de paso.
   *  - El ABUELO decide si realmente avanza (submitPersonalStep).
   */
  // onSubmit(): void {
  //   if (this.personalForm?.valid) {
  //     this.personalForm.markAllAsTouched();
  //     this.wizardService.nextStep();
  //   } else {
  //     this.personalForm?.markAllAsTouched();
  //   }
  // }

  /**
   * Maneja el cambio en el input de archivo para la foto del usuario.
   * Guarda el File dentro del FormGroup en el control "photo".
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Guardamos el archivo en el formulario para que el ABUELO
    // pueda leerlo y armar el FormData.
    this.personalForm.get('photo')?.setValue(file);
    this.personalForm.get('photo')?.markAsDirty();
    this.personalForm.get('photo')?.markAsTouched();

    // (Opcional) Generar preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
