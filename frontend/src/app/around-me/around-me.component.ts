import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesProfessionellesService } from '../services/categories-professionnelles.service';

@Component({
  selector: 'app-around-me',
  templateUrl: './around-me.component.html',
  styleUrls: ['./around-me.component.css']
})
export class AroundMeComponent implements OnInit {
  @Input() codePostal: string;
  @Input() activite: string;
  categories;
  defaultActivity = "1";
  defaultCodePostal = "";

  constructor(private router: Router, private route: ActivatedRoute, private catProService: CategoriesProfessionellesService) { }
  //initialization
  ngOnInit(): void {
    this.getAllCategories();
    this.codePostal = this.route.snapshot.paramMap.get('cp');
    this.activite = this.route.snapshot.paramMap.get('act');
    this.defaultCodePostal = this.codePostal;
    if (this.codePostal == null || this.activite == null) {
      this.activite = this.defaultActivity;
      this.codePostal = "0";
      this.defaultCodePostal = "";
    }

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  //submit the research form
  onSubmit(form: NgForm) {
    this.router.navigate(['research', form.value.cp, form.value.act]);
  }

  // get all the categories 
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
