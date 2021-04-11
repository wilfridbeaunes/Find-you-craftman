import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/match.validator';

@Component({
  selector: 'app-artisan-update-password',
  templateUrl: './artisan-update-password.component.html',
  styleUrls: ['./artisan-update-password.component.css']
})
export class ArtisanUpdatePasswordComponent implements OnInit {

  accountFormGroup: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,) { }

  ngOnInit(): void {

    this.accountFormGroup = this.fb.group({
      Ancienpassword:'',
      password:['', [Validators.required,Validators.minLength(6)]],
      confirmPassword:['', Validators.required]
    },{
      validator: [MustMatch('password', 'confirmPassword')],
    });
  }
  get account() { return this.accountFormGroup.controls; }
  
  async SaveForm() {
    const formData = this.accountFormGroup.getRawValue();
    const data = {
      Ancienpassword:formData.Ancienpassword,
      password:formData.password,
    }
    //send my data to the backend server
    try {
      let result = await this.http.post<any>('http://localhost:8000/api/edit/password', data).toPromise();
      if (result) {
        this.router.navigate(['profil']); //route when data was updated well 
      }
    } catch (error) {
      console.log(error);
    }
  }


}
