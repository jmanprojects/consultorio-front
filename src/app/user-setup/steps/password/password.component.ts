import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements OnInit {

  /**
   * Subformulario de contraseña dentro del formulario raíz del wizard.
   * Es el grupo: configForm.get('password')
   */
  passwordForm!: FormGroup;

  /**
   * Controla si se muestra o no el formulario de cambio de contraseña.
   * - true  => muestra el formulario (primer login, aún no ha cambiado)
   * - false => muestra el mensaje de que ya no puede cambiarla aquí
   */
  showForm: boolean = true;

  constructor(private wizardService: WizardService) {}

  ngOnInit(): void {
    // Si ya cambió su contraseña en un login previo,
    // no mostramos el formulario otra vez.
    if (this.wizardService.getStatusPassword()) {
      this.showForm = false;
    }

    // Obtenemos el formulario raíz del wizard y luego el subgrupo "password"
    const rootForm = this.wizardService.wizardForm as FormGroup;
    this.passwordForm = rootForm.get('password') as FormGroup;
  }

  /**
   * Envío del formulario de cambio de contraseña.
   * Si el formulario es válido:
   *  - Notificamos al WizardService que queremos ir al siguiente paso.
   *  - El ABUELO será quien realmente haga la llamada al backend
   *    y avance de paso (submitPasswordStep).
   */
  onSubmit(): void {
    if (this.passwordForm?.valid) {
      this.passwordForm.markAllAsTouched();
      this.wizardService.nextStep();
    } else {
      this.passwordForm?.markAllAsTouched();
    }
  }

  /**
   * Opción para cuando ya no se puede cambiar la contraseña aquí.
   * Solo avisa al ABUELO que queremos seguir con el wizard.
   */
  // onNext(): void {
  //   this.wizardService.nextStep();
  // }

}
