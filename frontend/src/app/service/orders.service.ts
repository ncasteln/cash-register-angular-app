import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder, IOrderResponse, IProduct, IUnit } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly ordersUrl = `${environment.apiUrl}/orders`;

  constructor( private http: HttpClient ) {}

  getOrders() {
    return (this.http.get<IOrder[]>(this.ordersUrl));
  }

  getOrderById( _id: string ) {
    return (this.http.get<IOrder>(`${this.ordersUrl}/${_id}`))
  }

  create( units: IUnit[] ) {
    return (
      this.http.post<IOrderResponse>(`${this.ordersUrl}/create/`,
        units,
        { observe: 'response' }
      ));
  }

  delete( _id: string ) {
    return (this.http.delete<IOrder>(
      `${this.ordersUrl}/delete/${_id}`,
      { observe: 'response' }))
  }

  update( _id: string, newUnit: IUnit ) {
    return (
      this.http.put<IProduct>(
        `${this.ordersUrl}/update/${_id}`,
        newUnit
        ));
  }

  markOrder( _id: string ) {
    return (
      this.http.put<IOrderResponse>(
        `${this.ordersUrl}/update/markOrder/${_id}`,
        { observe: 'response' }
      ));
  }

  markUnit( _id: string, unitIndex: number ) {
    return (
      this.http.put<IOrderResponse>(
        `${this.ordersUrl}/update/markUnit/${_id}/${unitIndex}`,
        { observe: 'response' }
      ));
  }

  addNote( _id: string, newUnit: IUnit ) {
  }

  reset() {
    return (this.http.delete(this.ordersUrl + '/reset', { observe: 'response' }))
  }
}
