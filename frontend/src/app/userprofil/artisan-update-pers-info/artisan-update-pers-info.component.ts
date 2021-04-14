import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Authservice } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-artisan-update-pers-info',
  templateUrl: './artisan-update-pers-info.component.html',
  styleUrls: ['./artisan-update-pers-info.component.css']
})
export class ArtisanUpdatePersInfoComponent implements OnInit {
  public ArtisanForm: FormGroup;
  submitted = false;
  user;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authservice: Authservice,
    private router: Router,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private profiService: ProfilInfosservice) {
  }

  //even when edit have been updated
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  ngOnInit(): void {

    this.ArtisanForm = this.fb.group({
      Nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: '',
      Bio: '',
    });

    if (this.authservice.userId != null) {
      //with this route, I sent the ID of the user connected
      this.profiService.getProfilInfo().subscribe(
        (result: any) => {
          this.user = result;
          // Set the Values form edit
          this.ArtisanForm.controls["Nom"].setValue(this.user.nom);
          this.ArtisanForm.controls["Prenom"].setValue(this.user.prenom);
          this.ArtisanForm.controls["Phone"].setValue(this.user.telephone);
          this.ArtisanForm.controls["Email"].setValue(this.user.compte.email);
          this.ArtisanForm.controls["Bio"].setValue(this.user.biographie);
        })
    };


  }

  get personal() { return this.ArtisanForm.controls; }
  //submit button will store value from my front to a variable call data and sent it to the Api
  validateForm() {
    this.submitted = true;
    if (!this.ArtisanForm.invalid) {
      this.SaveForm();
    }
  }
  async SaveForm() {
    const formData = this.ArtisanForm.getRawValue();
    const data = {
      nom: formData.Nom,
      prenom: formData.Prenom,
      phone: formData.Phone,
      bio: formData.Bio,
    }
    //send my data to the backend server
    try {
      let result = await this.http.patch<any>('http://localhost:8000/api/artisan/' + this.user.id, data).toPromise();
      if (result.success) {
        this.router.navigate(['profil']); //route when data was updated well 
        this.matDialog.closeAll();
        this.openSnackBar("vos informations ont été mise a jour ! ", 'close');
      }
    } catch (error) {
      console.log('error login data share');
      console.log(error);
    }
  }

}
