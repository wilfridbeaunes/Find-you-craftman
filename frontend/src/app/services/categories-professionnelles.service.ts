import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesProfessionellesService {

  constructor(private http: HttpClient) {
  }
  // get all the "categories" in the database from the backend
  getAllCategories() {
    return this.http.get('http://localhost:8000/api/categories');
  }

}
