import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = "http://localhost:3000/locations";
  constructor(private http: HttpClient) { }

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.http.get<HousingLocation | undefined>(`${this.url}/${id}`);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email}`);
  }
}
