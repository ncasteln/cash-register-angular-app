import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder, IProduct, IUnit } from '../models';

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
      this.http.post<IOrder>(`${this.url}/create/`,
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

  reset() {
    return (this.http.delete(this.url + '/reset', { observe: 'response' }))
  }
}
