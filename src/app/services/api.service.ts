import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  private baseUrl = "https://firestore.googleapis.com/v1/projects/kvaonlineshop/databases/(default)/documents/items";

  constructor(private httpClient: HttpClient) { }


  getProductById(id : string):Observable<Item>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<GetResponseProductBody>(url).pipe(
      map(response => response.fields)
    );

  }
}
interface GetResponseProductBody{
  fields: Item;
  
}