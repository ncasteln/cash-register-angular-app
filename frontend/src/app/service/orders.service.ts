import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder, IOrderResponse, IProduct, IUnit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly url = 'http://localhost:3000/api/orders'

  constructor( private http: HttpClient ) {}

  getOrders() {
    return (this.http.get<IOrder[]>(this.url));
  }

  getOrderById( _id: string ) {
    return (this.http.get<IOrder>(`${this.url}/${_id}`))
  }

  create( units: IUnit[] ) {
    return (
      this.http.post<IOrderResponse>(`${this.url}/create/`,
        units,
        { observe: 'response' }
      ));
  }

  delete( _id: string ) {
    return (this.http.delete<IOrder>(
      `${this.url}/delete/${_id}`,
      { observe: 'response' }))
  }

  update( _id: string, newUnit: IUnit ) {
    return (
      this.http.put<IProduct>(
        `${this.url}/update/${_id}`,
        newUnit
        ));
  }

  markOrder( _id: string ) {
    return (
      this.http.put<IOrderResponse>(
        `${this.url}/update/markOrder/${_id}`,
        { observe: 'response' }
      ));
  }

  markUnit( _id: string, unitIndex: number ) {
    return (
      this.http.put<IOrderResponse>(
        `${this.url}/update/markUnit/${_id}/${unitIndex}`,
        { observe: 'response' }
      ));
  }

  addNote( _id: string, newUnit: IUnit ) {
  }

  reset() {
    return (this.http.delete(this.url + '/reset', { observe: 'response' }))
  }
}
