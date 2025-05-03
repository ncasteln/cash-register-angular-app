import { Component, EventEmitter, Output } from '@angular/core';
import { OrdersService } from '../../service/orders.service';

@Component({
  selector: 'history-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './history-toolbar.component.html',
  styleUrl: './history-toolbar.component.scss'
})
export class HistoryToolbarComponent {
  @Output() reset = new EventEmitter();

  constructor( private ordersService: OrdersService ) {}

  onClickReset() {
    this.reset.emit();
  }
}
