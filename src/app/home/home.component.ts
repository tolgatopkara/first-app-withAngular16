import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section>
      <form action="">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
     <app-housing-location *ngFor="let housingLocation of filteredhousingLocationList"   [housingLocation]="housingLocation" />
    </section>
  `,
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, HousingLocationComponent]
})
export class HomeComponent {


  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredhousingLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().subscribe((housinglocationList: HousingLocation[]) => {
      this.housingLocationList = housinglocationList;
      this.filteredhousingLocationList = housinglocationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredhousingLocationList = this.housingLocationList;
    this.filteredhousingLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );

  }
}
