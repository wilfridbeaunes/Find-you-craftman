import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor(private http: HttpClient,
    public authservice: Authservice,
    private router: Router,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog) { }


  //even when account is deleted
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }  

  ngOnInit(): void {
  }

  async deleteAccount(){
    //send my data to the backend server
    try {                                                       //j'envoie a l'Api id de l'utilisateur qui est connecter 
      let result = await this.http.delete<any>('http://localhost:8000/api/delete/'+this.authservice.userId).toPromise();
      if (result.success) {
        this.router.navigate(['/']); //route   when data was updated well 
        this.matDialog.closeAll();
        this.authservice.isConnected= false;
        this.openSnackBar("vos informations ont été mise a jour ! ", 'close');
      }
    } catch (error) {
      console.log('error login data share');
      console.log(error);
    }
  }

}
