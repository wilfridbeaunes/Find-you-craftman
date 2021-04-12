import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/services/auth.service';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';

@Component({
  selector: 'app-artisan-update-travaux',
  templateUrl: './artisan-update-travaux.component.html',
  styleUrls: ['./artisan-update-travaux.component.css']
})
export class ArtisanUpdateTravauxComponent implements OnInit {

  public travauxForm: FormGroup;
  selectPhoto: File = null;

  user;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authservice: Authservice,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profiService: ProfilInfosservice) { 
  }
 
  ngOnInit(): void {

    this.travauxForm = this.fb.group({
      obj: '', 
      dd: '', 
      df:'', 
      photos:'',
    });

    if(this.authservice.userId!= null){
      //with this route, I sent the ID of the user connected
      this.profiService.getProfilInfo().subscribe(
        (result:any)=>{
            this.user=result;
            // Set the Values form edit
            this.travauxForm.controls["obj"].setValue('in progress'); //this.user.nom
            this.travauxForm.controls["dd"].setValue('');
            this.travauxForm.controls["df"].setValue('');
            this.travauxForm.controls["photos"].setValue('');
        })
    };
  }
   // photos 
   onFileSelected(event){ 
    this.selectPhoto=<File>event.target.files[0]; 
    console.log( this.selectPhoto)
  };
    //submit button will store value from my front to a variable call data and sent it to the Api
  async SaveForm() {
    const formData = this.travauxForm.getRawValue();
    const data = {
      obj:formData.objectif,
      df:formData.df,
      dd:formData.dd,
      photos:this.selectPhoto.name
    }
    //send my data to the backend server
    try {
      let result = await this.http.post<any>('http://localhost:8000/api/edit/travaux/{artisan}', data).toPromise();
      if (result.success) {
        this.router.navigate(['profil']); //route when data was updated well 
      }
    }catch (error) {
      console.log(error);
    }
  }

}
