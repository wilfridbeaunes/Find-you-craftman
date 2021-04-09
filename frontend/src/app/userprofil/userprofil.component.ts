import { Component, OnInit } from '@angular/core';
import {Authservice} from '.././services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userprofil',
  templateUrl: './userprofil.component.html',
  styleUrls: ['./userprofil.component.css'],
 
})
export class UserprofilComponent implements OnInit {
  user;
  constructor(
    public authservice: Authservice,
    private http: HttpClient) {
  }
        
  ngOnInit(): void {

    if(this.authservice.userId != null){
      var data={
        id: ''+this.authservice.userId
      }
      //with this route, I sent the ID of the user connected
      this.http.get('http://localhost:8000/api/user/login',{params:data} ).subscribe(
        (result:any)=>{
            console.log(result);
            this.user=result;
        }, 
        error=>{
          console.log(error);
        })
    }
  }



}
