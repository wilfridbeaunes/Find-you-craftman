import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResearchService {

  constructor(private http: HttpClient) {
  }

  // get the artisans by the "codePostale" and "activite" in the database from the backend server
  getArtisans(codePostal, activite) {
    var data = {
      cp: codePostal,
      act: activite,
    }
    return this.http.get('http://localhost:8000/api/research', { params: data });
  }


}
