import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { StepState } from '@angular/cdk/stepper';
import { CategoriesProfessionellesService } from 'src/app/services/categories-professionnelles.service';
import { MustMatch } from 'src/app/helpers/match.validator';
import { Observable } from 'rxjs';
import {debounceTime, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { latLng } from 'leaflet';
import { EmailExist } from 'src/app/helpers/email.validator';




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
  formSubmitted = false;
  categories;
  data;
  fullAdresse;
  addrError=false;

  isLoading = false;
  adressesFrance= [];

  // filteredOptions: Observable<string[]>;



  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private catProService: CategoriesProfessionellesService,
    private locationService : LocationService) { }

  ngOnInit(): void {
    
    this.categories = this.getAllCategories();
    this.categories= Array();

    this.personalFormGroup = this.fb.group({
      nom:['', Validators.required],
      prenom: ['', Validators.required], //name of fields i want to get values 
      telephone:'',
      biographie:'',
    });

    this.businessFormGroup = this.fb.group({
      nom_entreprise: ['', Validators.required],
      addr: '',
      act: ['', Validators.required],
    });
    
    this.accountFormGroup = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]],
      confirmPassword:['', Validators.required]
    },{
      validator: [MustMatch('password', 'confirmPassword'),EmailExist('email', this.http)],
    });
    this.business.addr.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.adressesFrance = [];
          this.isLoading = true;
        }),
        switchMap(value =>this.locationService.getAutoComplete(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        this.addrError= false;
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

  recap(){
    const personalData= this.personalFormGroup.getRawValue();
    const businessData= this.businessFormGroup.getRawValue(); 
    const accountData= this.accountFormGroup.getRawValue(); 

    this.data={
      entreprise:businessData.nom_entreprise,
      nom:personalData.nom,
      prenom:personalData.prenom, 
      email:accountData.email,
      password:accountData.password, 
      phone:personalData.telephone,
      bio:personalData.biographie,
      act:businessData.act,
      addr:this.fullAdresse.addr,
      cp: this.fullAdresse.pc,
      cc: this.fullAdresse.cc,
      lon : this.fullAdresse.lon,
      lat: this.fullAdresse.lat
    }
    console.log(this.data);
    
    
  }

  getAllCategories(){
    return this.catProService.getAllCategories().subscribe(
      (result:any)=>{                
        this.categories = result;        
      },
      error=>{
        console.log(error);
      }
    );
  }
  getCat(id){    
    return this.categories[id].titre;
  }

  get business() { return this.businessFormGroup.controls; }
  get personal() { return this.personalFormGroup.controls; }
  get account() { return this.accountFormGroup.controls; }

  backToPersonal(stepper: MatStepper){
    stepper.previous();
  }
  backToBusiness(stepper: MatStepper){
    stepper.previous();
  }
  backToAccount(stepper: MatStepper){
    stepper.previous();
  }

  submitBusiness(stepper: MatStepper){
    this.businessSubmitted= true;
    if(!this.businessFormGroup.invalid){
      if(this.adressesFrance.length>0 && this.business.addr.value == this.adressesFrance[0]){
        this.locationService.getFullAdresseInformations(this.business.addr.value).subscribe(
          (result:any)=>{   
            this.fullAdresse = {
              addr: result.features[0].properties.label,
              pc: result.features[0].properties.postcode,
              cc:result.features[0].properties.citycode,
              lon: result.features[0].geometry.coordinates[0],
              lat:result.features[0].geometry.coordinates[1]
            };                    
          },
          error=>{
            console.log(error);
          }
        );
        stepper.next();
      }else{
        this.addrError= true;
      }
    }
  }
  submitPersonal( stepper: MatStepper){
    this.personalSubmitted= true;
    if(!this.personalFormGroup.invalid){
      stepper.next();
    }
  }
  submitAccount(stepper: MatStepper){
    this.accountSubmitted= true;
    if(!this.personalFormGroup.invalid){
      this.recap();
      stepper.next();    
    }

  }

  submitAllFroms(){
    this.sendData();
  }

  sendData(){
    console.log(this.data);
    
    // I sent the value form my view to the backend for storage
    this.http.post('http://localhost:8000/api/signup',this.data).subscribe(
      (result:any)=>{
        if(result.success){
          this.router.navigate(['login']); //we go to this route when the email is unuse
          this.openSnackBar("Inscription réussi ! Bienvenue sur FindMyCraftman !",'close');
        }
      }, 
      error=>{
        console.log(error); 
      }
    );
  }
}
