import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { IOrder, Order } from '../../models';
import { AmountType } from '../../models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'history-item',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss'
})
export class HistoryItemComponent implements OnInit {
  @Input() order: IOrder = new Order();
  @Output() deleteOrder = new EventEmitter();

  total = signal(0);

  constructor() {}

  ngOnInit(): void {
    this.total.set(this.order.units.reduce((accumulator, unit) => {
      return accumulator + unit.subtotal;
    }, 0))
  }
}
