import { Component, OnInit } from '@angular/core';
import {Authservice} from '.././services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfilInfosservice } from '../services/profil-infos.service';

@Component({
  selector: 'app-userprofil',
  templateUrl: './userprofil.component.html',
  styleUrls: ['./userprofil.component.css'],
 
})
export class UserprofilComponent implements OnInit {
  user;
  constructor(
    public authservice: Authservice,
    private http: HttpClient,
    private profiService: ProfilInfosservice) {
  }
        
  ngOnInit(): void {

    if(this.authservice.userId != null){
      //with this route, I sent the ID of the user connected
      this.profiService.getProfilInfo().subscribe(
        (result:any)=>{
            this.user=result;
        }, 
        error=>{
          console.log(error);
        })
    }
  }
  
  // photo de profil
  selectedPicture: File = null;
  onFileSelected(event){
    this.selectedPicture=<File>event.target.files[0];
    console.log(this.selectedPicture);
  }

  
}
