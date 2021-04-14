import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/services/auth.service';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';
import { ProfilService } from 'src/app/services/profil.service';
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
    private infoService: ProfilInfosservice,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profilService: ProfilService) { }

  // initialization
  ngOnInit(): void {
    if (this.authservice.userId != null) {
      //with this route, I sent the ID of the user connected
      this.infoService.getProfilInfo().subscribe(
        (result: any) => {
          this.user = result;
          this.travaux = this.user.travaux;
        })
    };
  }

  //display a given message
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  // send to the api server the id of the "travaux" to delete
  async deleteTravaux(id){
    try {
      let result = await this.profilService.deleteTravaux(id);
      if (result.success) {
        this.router.navigate(['/profil']);
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

  // naviagte to the modification dialog
  modifierTravaux(travail){
    this.dialog.closeAll();
    this.dialog.open(ArtisanUpdateTravauxComponent,{
      data: {
        travail:travail
      }
    });
  }

  // naviagte to the adding dialog
  ajouterTravail(){
    this.dialog.closeAll();
    this.dialog.open(ArtisanUpdateTravauxComponent);
  }


}
