import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export class CustomeDateValidators {
    static fromToDate(dateDebut: string, dateFin: string) {
        return (formGroup: FormGroup) => {
            const debutControl = formGroup.controls[dateDebut];
            const finControl = formGroup.controls[dateFin];
        
            if (finControl.errors && !finControl.errors.date) {
                return;
            }            
           // Ausing the fromDate and toDate are numbers. In not convert them first after null check
            if ((debutControl.value !== '' && finControl.value !== '') && debutControl.value > finControl.value) {
                finControl.setErrors({ date: true });
            }else{
                finControl.setErrors(null); 
            }
            return;
        };
    }
}
