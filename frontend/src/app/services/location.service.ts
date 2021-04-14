import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) {
  }

  // get a GeoCodeJSON response from the france gouv api 
  getLocationByPostCode(cp: string): Observable<any> {
    return this.http.get("https://api-adresse.data.gouv.fr/search/?"
      + "q=" + cp + "&type=municipality");
  }

  // calculate the distance between 2 coordinates
  getDistanceBetween(fromCoord: L.LatLng, toCoord: L.LatLng) {
    return fromCoord.distanceTo(toCoord);
  }

  // extract the coordinates from a given GeoCodeJSON
  getCoordFromLocation(location) {
    //console.log(location);
    var coordinates = {
      lat: location.features[0].geometry.coordinates[1],
      lng: location.features[0].geometry.coordinates[0],
    };
    return coordinates;
  }
  // get the list of adresses that corresponde to the given value
  getAutoComplete(value) {
    if (value != "" && value != " ") {
      return this.http.get("https://api-adresse.data.gouv.fr/search/?"
        + "q=" + value + "&autocomplete=1");
    } else {
      return this.http.get("https://api-adresse.data.gouv.fr/search/?"
        + "q=0&autocomplete=1");
    }
  }

  //check if the response is empty 
  IsEmpty(response) {
    return response.features.length == 0;
  }

  // get all the informations from a given adresse (lat, lon, ..etc)
  getFullAdresseInformations(value) {
    return this.http.get("https://api-adresse.data.gouv.fr/search/?q=" + value);
  }

}