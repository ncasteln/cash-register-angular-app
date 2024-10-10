import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly productsUrl = 'http://localhost:3000/api/products'

  constructor( private http: HttpClient ) { }

  getProducts() {
    return this.http.get<IProduct[]>(this.productsUrl);
  }
}
