import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Authservice } from '../../services/auth.service';

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
    private _snackBar: MatSnackBar,
    private authservice: Authservice) { }

  //even when authentifation is fasle or true
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  //submit button will store value from my front to a variable call data 
  async submit() {
    // console.log(this.form.getRawValue()); // for see my data un consol debug
    const formData = this.form.getRawValue();
    const data = {
      email: formData.email,
      password: formData.password,
    }
    //send my data to the backend server
    try {
      let result = await this.http.post<any>('http://localhost:8000/api/login', data).toPromise();
      this.authservice.isConnected = result.success;      //boolean return to Authservice when user is connected or not
      this.authservice.userId = result.message.id;      //id return to Authservice when user is connected 

      if (result.success) {
        this.router.navigate(['profil']); //route when authentification is succed
        this.openSnackBar(result.message.msg, 'close');
      }
      else {
        this.openSnackBar(result.message, 'close');
      }
    } catch (error) {
      console.log('error login data share');
      console.log(error);
    }
  }

}
