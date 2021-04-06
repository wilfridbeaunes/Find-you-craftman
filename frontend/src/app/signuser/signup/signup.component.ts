import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  //even when authentifation is fasle or true
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  } 
  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      adresse: '',
      companyName: ['', Validators.required],
      job:'',
    });
    this.secondFormGroup = this.fb.group({
      nom:['', Validators.required],
      prenom: ['', Validators.required], //name of fields i want to get values 
      email: ['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.min(3)]],
      number:'',
    });
  }
  submit(){

    console.log(this.firstFormGroup.getRawValue()); // to see my date in consol debug
    console.log(this.secondFormGroup.getRawValue()); 
    const formDATA= this.secondFormGroup.getRawValue(); // i store my data in a array call data 
    const formData= this.firstFormGroup.getRawValue(); // i store my data in a array call data 
  
    const data={
      companyName:formData.companyName,
      adresse:formData.adresse,
      nom:formDATA.nom,
      prenom:formDATA.prenom, 
      email:formDATA.email,
      password:formDATA.password, 
      number:formDATA.number,
      job:formData.job
    }
    // i sent the value form my view to the backend for storage
    this.http.post('http://localhost:8000/api/signup',data).subscribe(
      (result:any)=>{
        console.log('succes connection signup'); //to see yhe message in consol debug
        console.log(result);
        if(result.success){
          this.router.navigate(['login']); //we go to this route when the email is unuse
          this.openSnackBar(result.message,'close');
        }
        else this.openSnackBar(result.message,'close');
      }, 
      error=>{
        console.log('succes connection signup'); //to see the error in consol debug
        console.log(error);
        
      }
      
    );
  }
}
