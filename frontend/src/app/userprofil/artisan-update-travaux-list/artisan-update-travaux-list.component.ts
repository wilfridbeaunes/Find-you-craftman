import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/services/auth.service';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';
import { ArtisanUpdateTravauxComponent } from '../artisan-update-travaux/artisan-update-travaux.component';

@Component({
  selector: 'app-artisan-update-travaux-list',
  templateUrl: './artisan-update-travaux-list.component.html',
  styleUrls: ['./artisan-update-travaux-list.component.css']
})
export class ArtisanUpdateTravauxListComponent implements OnInit {

  user;
  travaux= [];
  constructor(private authservice: Authservice,
    private profilService: ProfilInfosservice,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authservice.userId != null) {
      //with this route, I sent the ID of the user connected
      this.profilService.getProfilInfo().subscribe(
        (result: any) => {
          this.user = result;
          this.travaux = this.user.travaux;
        })
    };
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  async deleteTravaux(id){
    try {
      let result = await this.http.delete<any>('http://localhost:8000/api/delete/travaux/' + id).toPromise();
      if (result.success) {
        this.dialog.closeAll();
        this.dialog.open(ArtisanUpdateTravauxListComponent,
          {
            width: '600px',
          });
        this.openSnackBar("Le travail a bien été supprimer ! ", 'close');
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  modifierTravaux(travail){
    this.dialog.open(ArtisanUpdateTravauxComponent,{
      data: {
        travail:travail
      }
    });
  }
  ajouterTravail(){
    console.log('ajouter!');
    this.dialog.open(ArtisanUpdateTravauxComponent);
  }


}
