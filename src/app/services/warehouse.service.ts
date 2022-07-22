import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private baseUrl: string = 'http://localhost:8080/quadvantage/warehouse/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.baseUrl);
  }

  findById(id: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(this.baseUrl + id);
  }

  save(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.baseUrl, warehouse);
  }

  delete(warehouses: Warehouse[]): Observable<any> {
    let paramUrl: string = this.baseUrl;
    warehouses.forEach((warehouse: Warehouse) => {
      paramUrl += warehouse.id + "/";
    });
    console.log(paramUrl);
    return this.http.delete<Warehouse>(paramUrl);
  }

  update(warehouse: Warehouse): Observable<any> {
    return this.http.put<Warehouse>(this.baseUrl, warehouse);
  }
}
