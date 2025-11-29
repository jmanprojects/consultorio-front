import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'wizard-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent{

  // form?: FormGroup = new FormGroup({});
  personalForm!: FormGroup;
  
  constructor(private wizardService:WizardService){

  }

  ngOnInit(): void {
    // this.form = this.wizardService.wizardForm;
    
    const rootForm = this.wizardService.wizardForm as FormGroup;
    this.personalForm = rootForm.get('personal') as FormGroup;
  }

  // onNext(){
  //   if(this.personalForm.invalid){
  //     this.personalForm.markAllAsTouched();
  //     return;
  //   }

  //   this.wizardService.nextStep();
  // }

  onBack(){
    this.wizardService.prevStep();
  }
  // onSubmit() {
  //   console.log('aqui dando click');
  //   if (this.personalForm?.valid) {
  //     // console.log('listo');
  //     this.wizardService.nextStep();
  //   } else {
  //     this.personalForm?.markAllAsTouched();
  //   }
  // }
  // form = this.wizardService.wizardForm;
  // passwordForm = this.form?.get('password') as FormGroup;


}
