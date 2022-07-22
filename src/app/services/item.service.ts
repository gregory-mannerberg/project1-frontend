import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl: string = 'http://localhost:8080/quadvantage/item/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  findById(id: number): Observable<Item> {
    return this.http.get<Item>(this.baseUrl + id);
  }

  save(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  delete(items: Item[]): Observable<any> {
    let paramUrl: string = this.baseUrl;
    items.forEach((item: Item) => {
      paramUrl += item.id + "/";
    });
    console.log(paramUrl);
    return this.http.delete<Item>(paramUrl);
  }

  update(item: Item): Observable<any> {
    return this.http.put<Item>(this.baseUrl, item);
  }
}
