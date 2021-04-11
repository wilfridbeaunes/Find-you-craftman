import { Component, OnInit  } from '@angular/core';
import {Authservice} from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtisanUpdatePersInfoComponent } from './userprofil/artisan-update-pers-info/artisan-update-pers-info.component';
import { DeleteAccountComponent } from './userprofil/delete-account/delete-account.component';
import { ArtisanUpdateBusInfoComponent } from './userprofil/artisan-update-bus-info/artisan-update-bus-info.component';
import { ArtisanUpdatePasswordComponent } from './userprofil/artisan-update-password/artisan-update-password.component';
import { ArtisanUpdateTravauxComponent } from './userprofil/artisan-update-travaux/artisan-update-travaux.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authservice: Authservice,
    public dialog: MatDialog) {}

  openDialogModifierPers(){
    this.dialog.open(ArtisanUpdatePersInfoComponent);
  }
  openDialogModifierBus(){
    this.dialog.open(ArtisanUpdateBusInfoComponent);
  }
  openDialogDeletaAccount(){
    this.dialog.open(DeleteAccountComponent);
  }

  openDialogModifierPwd(){
    this.dialog.open(ArtisanUpdatePasswordComponent);
  }

  openDialogModifierTrav(){
    this.dialog.open(ArtisanUpdateTravauxComponent);
  }
  
}


