import { Component, OnInit  } from '@angular/core';
import {Authservice} from './services/auth.service';
import { refreshService } from './services/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authservice: Authservice,
    public localStorage: refreshService) {}

    
}


