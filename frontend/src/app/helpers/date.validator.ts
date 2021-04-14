import {FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export class CustomeDateValidators {
    static fromToDate(dateDebut: string, dateFin: string) {
        return (formGroup: FormGroup) => {
            const debutControl = formGroup.controls[dateDebut];
            const finControl = formGroup.controls[dateFin];

            if (finControl.errors && !finControl.errors.date) {
                return;
            }
            // check if the date debut is before than date fin
            if ((debutControl.value !== '' && finControl.value !== '') && debutControl.value > finControl.value) {
                finControl.setErrors({ date: true });
            } else {
                finControl.setErrors(null);
            }
            return;
        };
    }
}
