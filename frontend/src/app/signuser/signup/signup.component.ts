import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { CategoriesProfessionellesService } from 'src/app/services/categories-professionnelles.service';
import { MustMatch } from 'src/app/helpers/match.validator';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { EmailExist } from 'src/app/helpers/email.validator';
import { ProfilService } from 'src/app/services/profil.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  businessFormGroup: FormGroup;
  personalFormGroup: FormGroup;
  accountFormGroup: FormGroup;

  businessSubmitted = false;
  personalSubmitted = false;
  accountSubmitted = false;

  addrError = false;
  isLoading = false;

  categories;
  data;
  fullAdresse;
  adressesFrance = [];

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private catProService: CategoriesProfessionellesService,
    private locationService: LocationService,
    private profilService: ProfilService) { }

  //initialization
  ngOnInit(): void {

    this.categories = this.getAllCategories();
    this.categories = Array();

    this.personalFormGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required], //name of fields i want to get values 
      telephone: '',
      biographie: '',
    });

    this.businessFormGroup = this.fb.group({
      nom_entreprise: ['', Validators.required],
      addr: '',
      act: ['', Validators.required],
    });

    this.accountFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [MustMatch('password', 'confirmPassword'), EmailExist('email', this.http)],
    });

    // listen if the user change the adresse field
    this.business.addr.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.adressesFrance = [];
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

  //even when authentifation is fasle or true
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }

  // save all the informations of the forms in the data variable
  recap() {
    const personalData = this.personalFormGroup.getRawValue();
    const businessData = this.businessFormGroup.getRawValue();
    const accountData = this.accountFormGroup.getRawValue();

    this.data = {
      entreprise: businessData.nom_entreprise,
      nom: personalData.nom,
      prenom: personalData.prenom,
      email: accountData.email,
      password: accountData.password,
      phone: personalData.telephone,
      bio: personalData.biographie,
      act: businessData.act,
      addr: this.fullAdresse.addr,
      cp: this.fullAdresse.pc,
      cc: this.fullAdresse.cc,
      lon: this.fullAdresse.lon,
      lat: this.fullAdresse.lat
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

  // return the categorie title of a given id 
  getCat(id) {
    return this.categories[id - 1].titre;
  }

  // getters for the forms controlers
  get business() { return this.businessFormGroup.controls; }
  get personal() { return this.personalFormGroup.controls; }
  get account() { return this.accountFormGroup.controls; }

  // back fonctions for stepper
  backToPersonal(stepper: MatStepper) {
    stepper.previous();
  }
  backToBusiness(stepper: MatStepper) {
    stepper.previous();
  }
  backToAccount(stepper: MatStepper) {
    stepper.previous();
  }

  // submit the business form
  submitBusiness(stepper: MatStepper) {
    this.businessSubmitted = true;
    if (!this.businessFormGroup.invalid) {
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
          },
          error => {
            console.log(error);
          }
        );
        stepper.next();
      } else {
        this.addrError = true;
      }
    }
  }

  //submit the personal form
  submitPersonal(stepper: MatStepper) {
    this.personalSubmitted = true;
    if (!this.personalFormGroup.invalid) {
      stepper.next();
    }
  }

  //submit the account form
  submitAccount(stepper: MatStepper) {
    this.accountSubmitted = true;
    if (!this.personalFormGroup.invalid) {
      this.recap();
      stepper.next();
    }

  }

  // submit all 3 forms by sending the data to the database
  submitAllFroms() {
    this.sendData();
  }

  // send all the data to the database to create an artisan
  sendData() {
    // I sent the value form my view to the backend for storage
    this.profilService.postArtisan(this.data).subscribe(
      (result: any) => {
        if (result.success) {
          this.router.navigate(['login']); //we go to this route when the email is unuse
          this.openSnackBar("Inscription réussi ! Bienvenue sur FindMyCraftman !", 'close');
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
