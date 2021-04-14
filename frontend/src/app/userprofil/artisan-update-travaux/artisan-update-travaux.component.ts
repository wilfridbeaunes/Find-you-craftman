import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomeDateValidators } from 'src/app/helpers/date.validator';
import { Authservice } from 'src/app/services/auth.service';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';
import { ArtisanUpdateTravauxListComponent } from '../artisan-update-travaux-list/artisan-update-travaux-list.component';

@Component({
  selector: 'app-artisan-update-travaux',
  templateUrl: './artisan-update-travaux.component.html',
  styleUrls: ['./artisan-update-travaux.component.css']
})
export class ArtisanUpdateTravauxComponent implements OnInit {

  public travauxForm: FormGroup;
  submitted = false;
  newTravaux = false;
  user;
  travail;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authservice: Authservice,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profiService: ProfilInfosservice,
    private matDialog: MatDialogRef<ArtisanUpdateTravauxComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    ) {

  }

  ngOnInit(): void {

    if (this.data != null) {
      this.travail = this.data.travail;
    }

    if (this.authservice.userId != null) {
      //with this route, I sent the ID of the user connected
      this.profiService.getProfilInfo().subscribe(
        (result: any) => {
          this.user = result;
        })
    };

    this.travauxForm = this.fb.group({
      obj: ['', Validators.required],
      dd: ['', Validators.required],
      df: ['', Validators.required],
    },
      {
        validator: [
          CustomeDateValidators.fromToDate('dd', 'df')
        ]
      });

    if (this.travail == null) {
      this.newTravaux = true;
    } else {
      console.log(this.travail.objectif);
      console.log(this.travail.date_debut);

      this.travauxForm.controls["obj"].setValue(this.travail.objectif); //this.user.nom
      this.travauxForm.controls["dd"].setValue(formatDate(this.travail.date_debut,"yyyy-MM-dd","en-US"));
      this.travauxForm.controls["df"].setValue(formatDate(this.travail.date_fin,"yyyy-MM-dd","en-US"));
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  get job() { return this.travauxForm.controls; }

  validateForm() {
    this.submitted = true;
    if (!this.travauxForm.invalid) {
      this.SaveForm();
    }
  }

  async SaveForm() {
    const formData = this.travauxForm.getRawValue();
    const data = {
      obj: formData.obj,
      df: formData.df,
      dd: formData.dd
    }
    try {
      if (this.newTravaux) {
        let result = await this.http.post<any>('http://localhost:8000/api/artisan/' + this.user.id + '/travaux', data).toPromise();

        if (result.success) {
          this.dialog.closeAll();
          this.dialog.open(ArtisanUpdateTravauxListComponent,
            {
              width: '600px',
            });
          this.openSnackBar("votre travail a bien été ajouté !", 'close');
        } else {
          console.log(result.error);
        }
      } else {
        let result = await this.http.post<any>('http://localhost:8000/api/travaux/' + this.travail.id, data).toPromise();
        console.log(result);
        
        if (result.success) {
          this.dialog.closeAll();
          this.dialog.open(ArtisanUpdateTravauxListComponent,
            {
              width: '600px',
            });
          this.openSnackBar("vos modifications ont été prises en compte !", 'close');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  annuler() {
    this.dialog.open(ArtisanUpdateTravauxListComponent,
      {
        width: '600px',
      });
  }

}
