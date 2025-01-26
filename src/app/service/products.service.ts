import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../models';
import { BehaviorSubject, catchError, map, Subject, tap, throwError } from 'rxjs';

interface IAction {
  action: string,
  product: IProduct
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly url = 'http://localhost:3000/api/products'
  private _action = new Subject<IAction>();
  public action$ = this._action.asObservable();

  constructor( private http: HttpClient ) {}

  getProducts() {
    return (this.http.get<IProduct[]>(this.url));
  }

  action( action: string, product: IProduct ) {
    this._action.next({ action, product });
  }

  getProductById( _id: string ) {
    return (this.http.get<IProductResponse>(`${this.url}/${_id}`))
  }

  create( productForm: IProduct ) {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' })

    return (
      this.http.post<IProduct>(this.url, productForm, {
        headers: headers,
        observe: 'response'
      }));
  }

  delete( product: IProduct ) {
    return (this.http.delete<IProductResponse>(`${this.url}/delete/${product.name}`, { observe: 'response' }))
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
      .put(
        `${this.url}/update/disable/${product.name}`,
        { observe: 'response' }
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
