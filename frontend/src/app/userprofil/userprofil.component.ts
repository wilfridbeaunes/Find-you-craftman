import { Component, Input, OnInit } from '@angular/core';
import {Authservice} from '.././services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfilInfosservice } from '../services/profil-infos.service';
import { ArtisanUpdatePersInfoComponent } from './artisan-update-pers-info/artisan-update-pers-info.component';
import { ArtisanUpdateBusInfoComponent } from './artisan-update-bus-info/artisan-update-bus-info.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ArtisanUpdatePasswordComponent } from './artisan-update-password/artisan-update-password.component';
import { ArtisanUpdateTravauxComponent } from './artisan-update-travaux/artisan-update-travaux.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userprofil',
  templateUrl: './userprofil.component.html',
  styleUrls: ['./userprofil.component.css'],
 
})
export class UserprofilComponent implements OnInit {
  user;
  visiter = true;
  @Input() id;

  constructor(
    public authservice: Authservice,
    private http: HttpClient,
    private profiService: ProfilInfosservice,
    public dialog: MatDialog,
    private router: Router,
    private params: ActivatedRoute) {
  }
  openDialogModifierPers(){
    this.dialog.open(ArtisanUpdatePersInfoComponent);
  }
  openDialogModifierBus(){
    this.dialog.open(ArtisanUpdateBusInfoComponent);
  }
  openDialogDeletaAccount(){
    this.dialog.open(DeleteAccountComponent);
  }
  openDialogModifierPwd(){
    this.dialog.open(ArtisanUpdatePasswordComponent);
  }
  openDialogModifierTrav(){
    this.dialog.open(ArtisanUpdateTravauxComponent);
  }

  ngOnInit(): void {
    this.id =  this.params.snapshot.paramMap.get('id');

    if(this.id != null){
      //with this route, I sent the ID of the user connected
      this.profiService.getProfilInfoById(this.id).subscribe(
        (result:any)=>{
            this.user=result;
        }, 
        error=>{
          console.log(error);
        })
    }else if(this.authservice.userId != null){
      //with this route, I sent the ID of the user connected
      this.profiService.getProfilInfo().subscribe(
        (result:any)=>{
            this.user=result;
        }, 
        error=>{
          console.log(error);
        })
    }else{
      this.router.navigate(['login']);
    }

    this.router.routeReuseStrategy.shouldReuseRoute = () =>{
      return false;
    };
    
    if(this.id==null && this.authservice.userId!=null){
      this.visiter=false;
    }
  }
  
  // photo de profil
  //selectedPicture: File = null;
  // onFileSelected(event){
  //   this.selectedPicture=<File>event.target.files[0];
  //   console.log(this.selectedPicture);
  // }

  
}
