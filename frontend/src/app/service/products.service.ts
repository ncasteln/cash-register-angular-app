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

  create( productForm: FormData ) {
    return (
      this.http.post<IProduct>(`${this.url}/create/`, productForm, {
        observe: 'response'
      }));
  }

  delete( _id: string ) {
    return (this.http.delete<IProductResponse>(
      `${this.url}/delete/${_id}`,
      { observe: 'response' }))
  }

  restore( _id: string ) {
    return (this.http.put<IProductResponse>(
      `${this.url}/restore/${_id}`,
      { observe: 'response' }))
  }

  update( _id: string, productForm: FormData ) {
    return (
      this.http.put<IProduct>(
        `${this.url}/update/${_id}`,
        productForm
        ));
  }

  disable( _id: string ) {
    return (
      this.http.put<IProductResponse>(
        `${this.url}/update/disable/${_id}`,
        { observe: 'response' }
      )
    )
  }

  reset() {
    return (this.http.delete(this.url + '/reset', { observe: 'response' }))
  }
}
