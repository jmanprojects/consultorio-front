import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  public wizardForm?: FormGroup;


  //Comunicación hijo → padre para avanzar pasos
  private nextStepSubject = new Subject<void>();
  nextStep$ = this.nextStepSubject.asObservable();

  constructor() { }

  // Llamar desde cualquier hijo para avisar que quiere ir al siguiente paso
  nextStep() {
    this.nextStepSubject.next();
  }

  // Método auxiliar opcional para que un hijo obtenga su subgrupo
  getStepForm(stepName: string): FormGroup | undefined {
    if (!this.wizardForm) return undefined;
    return this.wizardForm.get(stepName) as FormGroup;
  }

}
