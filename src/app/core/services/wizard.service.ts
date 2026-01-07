import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

/**
 * WizardService
 *
 * - Mantiene una referencia al formulario raíz del wizard (FormGroup completo).
 * - Expone eventos para avanzar y retroceder pasos (nextStep$, prevStep$).
 * - Gestiona banderas relacionadas al estado del wizard, como el cambio de contraseña.
 */
@Injectable({
  providedIn: 'root'
})
export class WizardService {

  /**
   * Formulario principal del wizard.
   * Contiene los subgrupos:
   *  - password
   *  - personal
   *  - consultorio
   *
   * Se inicializa en el componente abuelo (UserSetupComponent)
   * y los hijos acceden a él o a sus subgrupos.
   */
  public wizardForm?: FormGroup;

  /**
   * Subjects para comunicar eventos hijo → abuelo:
   * - nextStep$: cuando un hijo quiere avanzar al siguiente paso.
   * - prevStep$: cuando un hijo quiere retroceder al paso anterior.
   *
   * El abuelo se suscribe y decide si realmente navega o no,
   * según validaciones o llamadas al backend.
   */
  private nextStepSubject = new Subject<void>();
  private prevStepSubject = new Subject<void>();

  /** Observable para que el abuelo escuche solicitudes de "siguiente paso". */
  nextStep$ = this.nextStepSubject.asObservable();

  /** Observable para que el abuelo escuche solicitudes de "paso anterior". */
  prevStep$ = this.prevStepSubject.asObservable();

  /** Clave usada en localStorage para guardar si ya cambió la contraseña. */
  private readonly CHANGE_PASSWORD_KEY = 'change_password';

  constructor() { }

  /**
   * Dispara un evento para indicar que se desea avanzar al siguiente paso.
   * Se llama desde los componentes hijos (password, personal, consultorio)
   * cuando su formulario es válido.
   */
  nextStep(): void {
    this.nextStepSubject.next();
  }

  /**
   * Dispara un evento para indicar que se desea regresar al paso anterior.
   * Se llama desde los componentes hijos que tengan botón "Regresar".
   */
  prevStep(): void {
    this.prevStepSubject.next();
  }

  /**
   * Devuelve un subgrupo del formulario principal a partir de su nombre.
   * Ejemplos de stepName:
   *  - 'password'
   *  - 'personal'
   *  - 'consultorio'
   *
   * Útil si en el futuro quieres obtener dinámicamente grupos sin
   * duplicar lógica en cada componente hijo.
   */
  getStepForm(stepName: string): FormGroup | undefined {
    if (!this.wizardForm) return undefined;
    return this.wizardForm.get(stepName) as FormGroup;
  }

  /**
   * Marca en localStorage que el usuario ya cambió su contraseña
   * en el primer login.
   *
   * Esto se utiliza para:
   *  - Ocultar el formulario de cambio de contraseña si ya se usó una vez.
   *  - Mostrar un mensaje informando que solo podrá cambiarla después
   *    en configuración.
   */
  setChangePassword(): void {
    localStorage.setItem(this.CHANGE_PASSWORD_KEY, JSON.stringify(true));
  }

  /**
   * Obtiene el estado de si el usuario ya cambió su contraseña
   * en el primer login.
   *
   * @returns true si ya se cambió, false en caso contrario.
   */
  getStatusPassword(): boolean {
    const value = localStorage.getItem(this.CHANGE_PASSWORD_KEY);

    if (value === null) return false;

    try {
      return JSON.parse(value);
    } catch {
      // En caso de que el valor esté corrupto o no sea JSON válido.
      return false;
    }
  }

  /**
   * (Opcional / Futuro)
   * Limpia el formulario del wizard y cualquier estado asociado.
   * Puede ser útil si al finalizar el wizard quieres resetear todo.
   */
  resetWizard(): void {
    this.wizardForm?.reset();
    this.wizardForm = undefined;
    // También podrías limpiar flags de localStorage si así lo decides.
    // localStorage.removeItem(this.CHANGE_PASSWORD_KEY);
  }

}
