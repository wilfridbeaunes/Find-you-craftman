import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanUpdateTravauxListComponent } from './artisan-update-travaux-list.component';

describe('ArtisanUpdateTravauxListComponent', () => {
  let component: ArtisanUpdateTravauxListComponent;
  let fixture: ComponentFixture<ArtisanUpdateTravauxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanUpdateTravauxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanUpdateTravauxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
