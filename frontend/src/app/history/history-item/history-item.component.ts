import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { IOrder, Order } from '../../models';
import { AmountType } from '../../models';
import { DecimalPipe, NgClass } from '@angular/common';
import { OrdersService } from '../../service/orders.service';

@Component({
  selector: 'history-item',
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass
  ],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss'
})
export class HistoryItemComponent implements OnInit {
  @Input() order: IOrder = new Order();
  @Output() deleteOrder = new EventEmitter();

  total = signal(0);

  constructor( private ordersSerivce: OrdersService) {}

  ngOnInit(): void {
    this.total.set(this.order.units.reduce((accumulator, unit) => {
      return accumulator + unit.subtotal;
    }, 0))
  }

  onMarkUnit( unitIndex: number ) {
    if (this.order.marked)
      return ;
    this.ordersSerivce.markUnit(this.order._id, unitIndex).subscribe(res => {
      this.order.units[unitIndex].marked = res.newOrder.units[unitIndex].marked;
    });
  }

  onMarkOrder() {
    this.ordersSerivce.markOrder(this.order._id).subscribe(res => {
      this.order.marked = res.newOrder.marked;
    });
  }
}
