import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './signuser/login/login.component';
import { SignupComponent } from './signuser/signup/signup.component';
import { UserprofilComponent } from './userprofil/userprofil.component';
import { MapComponent } from './map/map.component';
import { AroundMeComponent } from './around-me/around-me.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profil', component: UserprofilComponent},
  {path: 'research', component: AroundMeComponent},
  {path: 'research/:cp/:act', component: AroundMeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
