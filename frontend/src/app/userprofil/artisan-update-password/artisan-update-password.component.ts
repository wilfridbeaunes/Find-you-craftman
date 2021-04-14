import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/match.validator';
import { CurrentPassword } from 'src/app/helpers/password.validator';
import { Authservice } from 'src/app/services/auth.service';

@Component({
  selector: 'app-artisan-update-password',
  templateUrl: './artisan-update-password.component.html',
  styleUrls: ['./artisan-update-password.component.css']
})
export class ArtisanUpdatePasswordComponent implements OnInit {

  accountFormGroup: FormGroup;
  currentPassword = false;
  submitted = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private idService: Authservice,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar) { }
  
  // initialization
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      oldPassword: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [MustMatch('password', 'confirmPassword'), CurrentPassword("oldPassword", this.http, this.idService.userId)],
    });
  }
  get account() { return this.accountFormGroup.controls; }

  //even when edit have been updated
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  // validate the form
  validateForm() {
    this.submitted = true;
    if (!this.accountFormGroup.invalid) {
      this.SaveForm();
    }
  }

  // send the data to the api server
  async SaveForm() {
    const formData = this.accountFormGroup.getRawValue();
    const data = {
      password: formData.password,
    }
    //send my data to the backend server
    try {
      let result = await this.http.patch<any>('http://localhost:8000/api/compte/' + this.idService.userId, data).toPromise();
      if (result) {
        this.router.navigate(['profil']); //route when data was updated well 
        this.matDialog.closeAll();
        this.openSnackBar("vos informations ont été mise a jour ! ", 'close');
      }
    } catch (error) {
      console.log(error);
    }
  }


}
