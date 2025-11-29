import { Component } from '@angular/core';
import { WizardService } from '../../../core/services/wizard.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wizard-consultorio',
  templateUrl: './consultorio.component.html',
  styleUrl: './consultorio.component.css'
})
export class ConsultorioComponent {

 // form?: FormGroup = new FormGroup({});
 consultorioForm!: FormGroup;
    
 constructor(private wizardService:WizardService){

 }

 ngOnInit(): void {
   // this.form = this.wizardService.wizardForm;
   const rootForm = this.wizardService.wizardForm as FormGroup;
   this.consultorioForm = rootForm.get('consultorio') as FormGroup;
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
