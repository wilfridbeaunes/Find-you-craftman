import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function CurrentPassword(passwordControlName: string, http, id) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[passwordControlName];

    if (passwordControl.errors && !passwordControl.errors.exists) {
      return;
    }

    const data = {
      password: passwordControl.value
    }
    // check if this is the current password of the user
    http.get('http://localhost:8000/api/password/' + id, { params: data }).subscribe(
      (result: any) => {
        if (!result.same) {
          passwordControl.setErrors({ notSame: true });
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
