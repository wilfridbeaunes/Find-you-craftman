import { AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../services/location.service';
import { ResearchService } from '../services/research.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{

  @Input() codePostal: string;
  @Input() activite: string;

  displayMap= true;

  // the map object
  map;
  //coordinates of the center of france as default values
  coordinates = {
    lat: 46.227638,
    lng: 2.213749,
  };
  //zoom level of the map display
  zoomLevel = 6;
  // retrieve icons images 
  // from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  constructor(private locationService : LocationService, private research: ResearchService) {}

  // if no input given display the whole country
  ngAfterViewInit(): void {
    if(this.codePostal=="0"){
      this.zoomLevel = 6;
      this.createMap();
    }
    
  }
  ngOnInit() {
    if(this.codePostal!="0"){
      // display the map according to the "code postale" given
      this.locationService.getLocationByPostCode(this.codePostal).subscribe(
        (answer:any)=>{
          if(this.locationService.IsEmpty(answer)){
            this.displayMap= false;
            return
          }
          this.coordinates = this.locationService.getCoordFromLocation(answer);
          this.zoomLevel = 13;
          this.createMap();
          this.getArtisans();
        },
        error=>{
          console.log(error);
        }
      );
    }

    
  }
  // creating the map display
  createMap() {
    
    this.map = L.map('map', {
      center: [this.coordinates.lat, this.coordinates.lng],
      zoom: this.zoomLevel
    });
    
    //creating the main layer of the map 
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: this.zoomLevel -5,
      maxZoom: this.zoomLevel +5
    });
    // putting the map into the main layer
    mainLayer.addTo(this.map);
    
  }
  // creating all the markers in the map display 
  addAllMarkers(resultats){
    resultats.forEach(artisan => {
      var adresse = artisan.entreprise.adresse;
      var coordinates = {
        lat: adresse.latitude,
        lng: adresse.longitude,
      };
      var description = 
      "<a href='profil'>"+artisan.prenom+" "+ artisan.nom+"</a>  de l'entreprise "+ artisan.entreprise.nom;
      const popupOptions = {
        coords: coordinates,
        text: description,
        open: false
      };
      this.addMarker(popupOptions);
    });
    
  }
  // create one marker and puts it in the map
  addMarker({coords, text, open}) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.map).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.map).bindPopup(text);
    }
  }

  // get all the "artisans" with the "codePostale" and "activite professionelles"
  getArtisans(){
    return this.research.getArtisans(this.codePostal,this.activite).subscribe(
      (result:any)=>{
        if(result.length>0){
          this.addAllMarkers(result);
        }else{
          this.displayMap =false;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  //Called once, before the instance is destroyed.
  ngOnDestroy(): void {
    if(this.map!=null){
      this.map.off();
      this.map.remove(); 
    }

  }

}
