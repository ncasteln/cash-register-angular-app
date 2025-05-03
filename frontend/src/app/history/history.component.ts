import { DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HistoryToolbarComponent } from './history-toolbar/history-toolbar.component';
import { HistoryItemComponent } from './history-item/history-item.component';
import { IOrder } from '../models';
import { OrdersService } from '../service/orders.service';
import {  tap } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    KeyValuePipe, /* Iter thorugh object in @for */
    DecimalPipe,
    HistoryToolbarComponent,
    HistoryItemComponent,
    DatePipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  history: IOrder[] = [];
  sortedHistory: { date: Date, orders: IOrder[] }[] = []

  constructor( private ordersService: OrdersService ) {}

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.ordersService.getOrders()
      .pipe(
        tap(orders => {
          this.sortedHistory = this.groupByDate(orders);
        })
      )
      .subscribe(o => {
        this.history = o;
      });
  }

  groupByDate( orders: IOrder[] ): { date: Date, orders: IOrder[] }[] {
    const groups = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);

      // Create group if doesn't exist
      if (!acc.some(g => g.date.getDate() === date.getDate())) {
        acc.push({ date, orders: [] });
      }

      // Add order to appropriate group
      const group = acc.find(g => g.date.getDate() === date.getDate());
      if (group) {
        group.orders.push(order);
      }

      return acc;
    }, [] as { date: Date, orders: IOrder[] }[]);

    // Sort groups by date (newest first)
    return groups.sort((a, b) => b.date.getDate() - a.date.getDate());
  }

  deleteOrder( _id: string ) {
    console.log(_id)
    this.ordersService.delete(_id).subscribe(o => this.getOrders())
  }

  onReset() {
    this.ordersService.reset().subscribe(o => this.getOrders());
  }
}
