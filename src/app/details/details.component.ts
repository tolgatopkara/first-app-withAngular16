import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>

      <section class="listing-features">
        <h2 class="section-heading">About this location</h2>
        <ul>
          <li>Unit Avaible: {{housingLocation?.availableUnits}}</li>
          <li>Does This Location have Wifi {{housingLocation?.wifi}}</li>
          <li>Does This Location have Laundry {{housingLocation?.laundry}}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" formControlName="firstName">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" formControlName="lastName">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">
          <button class="primary" type="submit">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).subscribe(housingLocation => {
      this.housingLocation = housingLocation;
    });

  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }

}
