import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly productsUrl = 'http://localhost:3000/api/products'

  constructor( private http: HttpClient ) { }

  getAllProducts() {
    return (this.http.get<IProduct[]>(this.productsUrl));
  }

  createProduct( productForm: IProduct ) {
    return (this.http.post<IProduct>(this.productsUrl, productForm));
  }

  deleteProduct( id: any /* !!!!! */ ) {
    return (this.http.delete<String>(this.productsUrl, id));
  }

  updateProduct( productToUpdate: IProduct ) {
    return (this.http.put<IProduct>(this.productsUrl, productToUpdate));
  }
}
