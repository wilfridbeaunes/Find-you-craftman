
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authservice } from './auth.service';


@Injectable({providedIn: 'root'})
 export class ProfilInfosservice{

    constructor(
        public authservice: Authservice,
        private http: HttpClient) {
      } 

   getProfilInfo(){
        var data={
            id: ''+this.authservice.userId
          }
        
        return this.http.get('http://localhost:8000/api/profil',{params:data});
   }
} 
