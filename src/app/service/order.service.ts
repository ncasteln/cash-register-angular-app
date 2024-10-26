import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly url = 'http://localhost:3000/api/order'
  constructor( private http: HttpClient ) {}

  getAll() {
    // return (this.http.get<IProduct[]>(this.url));
  }

  // getProductById( id: string ) {
  //   return (this.http.get<IProduct>(this.url + "/" + id))
  // }

  create() {
    // return (
    //   this.http.post<IProduct>(
    //     this.url,
    //     productForm,
    //     { observe: 'response' }));
  }

  delete() {
    // return (
    //   this.http.delete<IProduct>(
    //     this.url + "/delete/" + product.name,
    //     { observe: 'response' }));
  }

  update() {
    // return (
    //   this.http.put<IProduct>(
    //     this.url + "/update/" + oldProduct.name,
    //     newProduct,
    //     { observe: 'response' }));
  }

  reset() {
    // return (this.http.delete(this.url + '/reset', { observe: 'response' }))
  }
}
