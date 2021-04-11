import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/services/auth.service';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';

@Component({
  selector: 'app-artisan-update-bus-info',
  templateUrl: './artisan-update-bus-info.component.html',
  styleUrls: ['./artisan-update-bus-info.component.css']
})
export class ArtisanUpdateBusInfoComponent implements OnInit {

  public ArtisanForm: FormGroup;
  selectedLogo: File = null;
  user;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authservice: Authservice,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profilService:ProfilInfosservice) { 
    }

    //even when edit have been updated
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  ngOnInit(): void {

    this.ArtisanForm = this.fb.group({
      nom: '',
      cp:'',
      adresse:'',
      url:'',
      logo:'',
      lg:''
  
    });

    if(this.authservice.userId != null){
      //with this route, I sent the ID of the user connected
      this.profilService.getProfilInfo().subscribe(
        (result:any)=>{
            this.user=result;
            // Set Values form edit
            this.ArtisanForm.controls["nom"].setValue(this.user.entreprise.nom);
            this.ArtisanForm.controls["adresse"].setValue(this.user.entreprise.adresse.adresse_postale);
            this.ArtisanForm.controls["url"].setValue(this.user.entreprise.url);
            this.ArtisanForm.controls["logo"].setValue(this.user.entreprise.logo);
            this.ArtisanForm.controls["cp"].setValue(this.user.professions.titre);
      })
    };

  }
  // logo 
  onFileSelected(event){ 
    this.selectedLogo=<File>event.target.files[0];
  };
    //submit button will store value from my front to a variable call data and sent it to the Api
  async SaveForm() {
    const formData = this.ArtisanForm.getRawValue();
    const data = {
      nom:formData.nom,
      adresse:formData.adresse,
      cp:formData.cp,
      url:formData.url,
      logo:this.selectedLogo
    }

    //send my data to the backend server
    try {
      let result = await this.http.post<any>('http://localhost:8000/api/edit/bussinesInfo', data).toPromise();
      if (result.success) {
        this.router.navigate(['profil']); //route when data was updated well 
        this.openSnackBar(result.message, 'close');
      }
    } catch (error) {
      console.log('error login data share');
      console.log(error);
    }
  }


}
