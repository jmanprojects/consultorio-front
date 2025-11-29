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
  private prevStepSubject = new Subject<void>();
  nextStep$ = this.nextStepSubject.asObservable();
  prevStep$ = this.prevStepSubject.asObservable();

  constructor() { }

  // Llamar desde cualquier hijo para avisar que quiere ir al siguiente paso
  nextStep() {
    this.nextStepSubject.next();
  }

  prevStep() {
    this.prevStepSubject.next();
  }

  // Método auxiliar opcional para que un hijo obtenga su subgrupo
  getStepForm(stepName: string): FormGroup | undefined {
    if (!this.wizardForm) return undefined;
    return this.wizardForm.get(stepName) as FormGroup;
  }

  setChangePassword(){
    // leer un booleano
    // const valor = JSON.parse(localStorage.getItem('esActivo')!); 
    localStorage.setItem('change_password', JSON.stringify(true));
  }

  
  getStatusPassword() {
    const value = localStorage.getItem('change_password');
    
    if (value === null) return false;
  
    try {
      return JSON.parse(value);
    } catch {
      return false;
    }
  }
  
  

}
