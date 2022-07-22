import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ItemType } from '../models/item-type';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  private baseUrl: string = 'http://localhost:8080/quadvantage/item-type/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(this.baseUrl);
  }

  findById(id: number): Observable<ItemType> {
    return this.http.get<ItemType>(this.baseUrl + id);
  }

  save(itemType: ItemType): Observable<ItemType> {
    return this.http.post<ItemType>(this.baseUrl, itemType);
  }

  delete(items: ItemType[]): Observable<any> {
    let paramUrl: string = this.baseUrl;
    items.forEach((itemType: ItemType) => {
      paramUrl += itemType.id + "/";
    });
    console.log(paramUrl);
    return this.http.delete<ItemType>(paramUrl);
  }

  update(itemType: ItemType): Observable<any> {
    return this.http.put<ItemType>(this.baseUrl, itemType);
  }
}
