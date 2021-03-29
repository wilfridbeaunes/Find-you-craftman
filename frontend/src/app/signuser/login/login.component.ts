import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  //even when authentifation is fasle
  openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 3000,
      });
    }  

  ngOnInit(): void {
  this.form= this.fb.group({
      email: '',
      password:''
    });
  }

  //submit button will store value from my front to a variable call data 
  submit(){
    console.log(this.form.getRawValue()); // for see my data un consol debug
    const formData= this.form.getRawValue();
    const data={
      email: formData.email,
      password:formData.password,
    }
    //send my data to the backend server
    this.http.post('http://localhost:8000/api/login',data).subscribe(
      (result:any)=>{
        console.log('succes login data share');
        console.log(result);
        if(result.success){
          this.router.navigate(['profil']); //route when authentification is succed
          this.openSnackBar(result.message,'close');
        }
        else this.openSnackBar(result.message,'close');
      },
      error=>{
        console.log('error login data share');
        console.log(error);
        
      }     
    );
  }

}
