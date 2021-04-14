
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from './auth.service';


@Injectable({ providedIn: 'root' })
export class ProfilService {

  constructor(
    public authservice: Authservice,
    private http: HttpClient) {
  }

  // get all the informations of the current user
  getLogin(data) {
    return this.http.get<any>('http://localhost:8000/api/login', { params: data }).toPromise();
  }

  // update entreprise
  patchEntreprise(data, idEntreprise, idUser) {
    return this.http.patch<any>('http://localhost:8000/api/entreprise/' + idEntreprise + '/artisan/' + idUser, data).toPromise();
  }

  // update a compte
  patchCompte(data, idUser) {
    return this.http.patch<any>('http://localhost:8000/api/compte/' + idUser, data).toPromise();
  }

  // update an artisan 
  patchArtisan(data, idUser) {
    return this.http.patch<any>('http://localhost:8000/api/artisan/' + idUser, data).toPromise();
  }

  // update a travaux
  patchTravaux(data, idTravail) {
    return this.http.patch<any>('http://localhost:8000/api/travaux/' + idTravail, data).toPromise();
  }

  // create a travaux
  postTravaux(data, idUser) {
    return this.http.post<any>('http://localhost:8000/api/artisan/' + idUser + '/travaux', data).toPromise();
  }

  // create a artisan
  postArtisan(data) {
    return this.http.post('http://localhost:8000/api/signup', data)
  }

  // delete a travaux
  deleteTravaux(idTravaux) {
    return this.http.delete<any>('http://localhost:8000/api/delete/travaux/' + idTravaux).toPromise();
  }

  // delete a artisan
  deleteArtisan(idCompte) {
    return this.http.delete<any>('http://localhost:8000/api/delete/'+idCompte).toPromise();
  }

}
