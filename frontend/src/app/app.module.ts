import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './home/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './signuser/login/login.component';
import { SignupComponent } from './signuser/signup/signup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserprofilComponent } from './userprofil/userprofil.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    LoginComponent,
    SignupComponent,
    UserprofilComponent,
   

  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule, 
    MatButtonModule,
    MatStepperModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
