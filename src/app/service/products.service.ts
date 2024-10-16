import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly url = 'http://localhost:3000/api/products'

  constructor( private http: HttpClient ) { }

  getAllProducts() {
    return (this.http.get<IProduct[]>(this.url));
  }

  // getProductById( id: string ) {
  //   return (this.http.get<IProduct>(this.url + "/" + id))
  // }

  createProduct( productForm: IProduct ) {
    return (this.http.post<IProduct>(this.url, productForm));
  }

  deleteProduct( product: IProduct ) {
    console.log("HERE: ", this.url + "/delete/" + product.name)
    return (
      this.http.delete<IProduct>(
        this.url + "/delete/" + product.name));
  }

  updateProduct( oldProduct: IProduct, newProduct: IProduct ) {
    console.log("HERE: ", this.url + "/update/" + oldProduct.name)
    return (
      this.http.put<IProduct>(
        this.url + "/update/" + oldProduct.name,
        newProduct,
        { observe: 'response' }));
  }
}
