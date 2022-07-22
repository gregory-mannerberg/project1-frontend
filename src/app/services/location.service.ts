import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl: string = 'http://localhost:8080/quadvantage/location/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl);
  }

  findById(id: number): Observable<Location> {
    return this.http.get<Location>(this.baseUrl + id);
  }

  save(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseUrl, location);
  }

  delete(locations: Location[]): Observable<any> {
    let paramUrl: string = this.baseUrl;
    locations.forEach((location: Location) => {
      paramUrl += location.id + "/";
    });
    console.log(paramUrl);
    return this.http.delete<Location>(paramUrl);
  }

  update(location: Location): Observable<any> {
    return this.http.put<Location>(this.baseUrl, location);
  }
}
