import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { Authservice } from 'src/app/services/auth.service';
import { CategoriesProfessionellesService } from 'src/app/services/categories-professionnelles.service';
import { LocationService } from 'src/app/services/location.service';
import { ProfilInfosservice } from 'src/app/services/profil-infos.service';

@Component({
  selector: 'app-artisan-update-bus-info',
  templateUrl: './artisan-update-bus-info.component.html',
  styleUrls: ['./artisan-update-bus-info.component.css']
})
export class ArtisanUpdateBusInfoComponent implements OnInit {


  public entrepriseForm: FormGroup;
  adressesFrance = [];
  fullAdresse;
  isLoading = false;
  addrError = false;
  submitted = false;
  categories;
  user;
  entreprise;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authservice: Authservice,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profilService: ProfilInfosservice,
    private locationService: LocationService,
    private catProService: CategoriesProfessionellesService,
    private matDialog: MatDialog) {
  }

  //display a message
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  // initialization
  ngOnInit(): void {
    this.categories = this.getAllCategories();
    this.categories = Array();

    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      addr: '',
      act: ['', Validators.required],
      url: '',
    });

    if (this.authservice.userId != null) {
      //with this route, I sent the ID of the user connected
      this.profilService.getProfilInfo().subscribe(
        (result: any) => {
          console.log(result);
          this.user = result;
          this.entreprise = this.user.entreprise;
          // Set Values form edit
          this.entrepriseForm.controls["nom"].setValue(this.user.entreprise.nom);
          this.entrepriseForm.controls["addr"].setValue(this.user.entreprise.adresse.adresse_postale);
          this.entrepriseForm.controls["url"].setValue(this.user.entreprise.url);
          // this.entrepriseForm.controls["logo"].setValue(this.user.entreprise.logo);
          this.entrepriseForm.controls["act"].setValue(this.user.professions[0].id);
        })
    };

    this.business.addr.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.adressesFrance
          this.isLoading = true;
        }),
        switchMap(value => this.locationService.getAutoComplete(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        this.addrError = false;
        var adresses = data['features'];
        var results = [];
        if (adresses.length == 0) {
          this.adressesFrance = [];
        } else {
          adresses.forEach(addr => {
            results.push(addr.properties.label);
          });
          this.adressesFrance = results;
        }
      });

  }

  // the getter for the business controler
  get business() { return this.entrepriseForm.controls; }

  //submit button will store value from my front to a variable call data and sent it to the Api
  ValidateForm() {
    this.submitted = true;
    if (!this.entrepriseForm.invalid) {
      if (this.adressesFrance.length > 0 && this.business.addr.value == this.adressesFrance[0]) {
        this.locationService.getFullAdresseInformations(this.business.addr.value).subscribe(
          (result: any) => {
            this.fullAdresse = {
              addr: result.features[0].properties.label,
              pc: result.features[0].properties.postcode,
              cc: result.features[0].properties.citycode,
              lon: result.features[0].geometry.coordinates[0],
              lat: result.features[0].geometry.coordinates[1]
            };
            this.SaveForm();
          },
          error => {
            console.log(error);
          }
        );

      } else {
        this.addrError = true;
      }
    }
  }

  // send the data de the database
  async SaveForm() {

    const formData = this.entrepriseForm.getRawValue();
    const data = {
      nom: formData.nom,
      addr: formData.addr,
      act: formData.act,
      url: formData.url,
      cp: this.fullAdresse.pc,
      cc: this.fullAdresse.cc,
      lon: this.fullAdresse.lon,
      lat: this.fullAdresse.lat
    }

    //send my data to the backend server
    try {
      let result = await this.http.patch<any>('http://localhost:8000/api/entreprise/' + this.entreprise.id + '/artisan/' + this.user.id, data).toPromise();
      if (result.success) {
        this.router.navigate(['profil']); //route when data was updated well 
        this.matDialog.closeAll();
        this.openSnackBar("vos informations ont été mise a jour ! ", 'close');
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get all the database categories
  getAllCategories() {
    return this.catProService.getAllCategories().subscribe(
      (result: any) => {
        this.categories = result;
      },
      error => {
        console.log(error);
      }
    );
  }
}
