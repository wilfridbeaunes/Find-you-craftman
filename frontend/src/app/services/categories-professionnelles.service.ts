import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import { Observable } from 'rxjs';


@Injectable()
export class CategoriesProfessionellesService { 

  constructor (private http: HttpClient) {
  }
  // get all the "categories" in the database from the backend
  getAllCategories(){
    return this.http.get('http://localhost:8000/api/categories');
  }
  async getAllCategoriesAsync(){
    return await this.http.get('http://localhost:8000/api/categories').toPromise();
  }


}
