import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../models';
import { catchError, tap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly url = 'http://localhost:3000/api/products'
  constructor( private http: HttpClient ) {}

  getAll() {
    return (this.http.get<IProduct[]>(this.url));
  }

  getProductById( _id: string ) {
    return (this.http.get<IProductResponse>(`${this.url}/${_id}`))
  }

  create( productForm: IProduct ) {
    return (
      this.http.post<IProduct>(
        this.url,
        productForm,
        { observe: 'response' }));
  }

  delete( product: IProduct ) {
    return (
      this.http
      .delete<IProductResponse>(`${this.url}/delete/${product.name}`, { observe: 'response' })
      .pipe(
        tap(this.handleSuccess('Delete', product)),
        catchError(this.handleError('Delete', product))
      )
    )
  }

  update( oldProduct: IProduct, newProduct: IProduct ) {
    return (
      this.http.put<IProduct>(
        this.url + "/update/" + oldProduct.name,
        newProduct,
        { observe: 'response' }));
  }

  uploadImg( oldProduct: IProduct ) {

  }

  disable( product: IProduct ) {
    return (
      this.http
      .put<IProductResponse>(`${this.url}/update/disable/${product.name}`, { observe: 'response' })
      .pipe(
        tap(this.handleSuccess('Enable/disable', product)),
        catchError(this.handleError('Enable/disable', product))
      )
    )
  }

  private handleError( op: string, product: IProduct ) {
    return (error: any) => {
      console.error(`* ${op} failed: ${error.message}`);
      return throwError(() => new Error(`Operation '${op}' failed for ID ${product.name}`));
    };
  }

  private handleSuccess( op: string, product: IProduct ) {
    return () => {
      console.log(`* ${op} success: ${product.name}`);
      // return throwError(() => new Error(`Operation '${op}' failed for ID ${product.name}`));
    };
  }

  reset() {
    return (this.http.delete(this.url + '/reset', { observe: 'response' }))
  }
}
