import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../models';
import { BehaviorSubject, catchError, map, Subject, tap, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

interface IAction {
  action: string,
  product: IProduct
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly productsUrl = `${environment.productsUrl}`

  private _action = new Subject<IAction>();
  public action$ = this._action.asObservable();

  constructor( private http: HttpClient ) {}

  getProducts() {
    return (this.http.get<IProduct[]>(this.productsUrl));
  }

  action( action: string, product: IProduct ) {
    this._action.next({ action, product });
  }

  getProductById( _id: string ) {
    return (this.http.get<IProductResponse>(`${this.productsUrl}/${_id}`))
  }

  create( productForm: FormData ) {
    return (
      this.http.post<IProduct>(`${this.productsUrl}/create/`, productForm, {
        observe: 'response'
      }));
  }

  delete( _id: string ) {
    return (this.http.delete<IProductResponse>(
      `${this.productsUrl}/delete/${_id}`,
      { observe: 'response' }))
  }

  restore( _id: string ) {
    return (this.http.put<IProductResponse>(
      `${this.productsUrl}/restore/${_id}`,
      { observe: 'response' }))
  }

  update( _id: string, productForm: FormData ) {
    return (
      this.http.put<IProduct>(
        `${this.productsUrl}/update/${_id}`,
        productForm
        ));
  }

  disable( _id: string ) {
    return (
      this.http.put<IProductResponse>(
        `${this.productsUrl}/update/disable/${_id}`,
        { observe: 'response' }
      )
    )
  }

  reset() {
    return (this.http.delete(this.productsUrl + '/reset', { observe: 'response' }))
  }
}
