import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrder, Order } from '../../models';
import { AmountType } from '../../models';

@Component({
  selector: 'history-item',
  standalone: true,
  imports: [],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss'
})
export class HistoryItemComponent implements OnInit {
  @Input() order: IOrder = new Order();
  @Output() deleteOrder = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }
}
