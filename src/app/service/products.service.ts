import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly url = 'http://localhost:3000/api/products'
  constructor( private http: HttpClient ) {}

  getAll() {
    return (this.http.get<IProduct[]>(this.url));
  }

  // getProductById( id: string ) {
  //   return (this.http.get<IProduct>(this.url + "/" + id))
  // }

  create( productForm: IProduct ) {
    return (
      this.http.post<IProduct>(
        this.url,
        productForm,
        { observe: 'response' }));
  }

  delete( product: IProduct ) {
    return (
      this.http.delete<IProduct>(
        this.url + "/delete/" + product.name,
        { observe: 'response' }));
  }

  update( oldProduct: IProduct, newProduct: IProduct ) {
    return (
      this.http.put<IProduct>(
        this.url + "/update/" + oldProduct.name,
        newProduct,
        { observe: 'response' }));
  }
}
