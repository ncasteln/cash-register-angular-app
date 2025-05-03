import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';

@Component({
  selector: 'cash-register-grid',
  standalone: true,
  imports: [],
  templateUrl: './cash-register-grid.component.html',
  styleUrl: './cash-register-grid.component.scss'
})
export class CashRegisterGridComponent {
  @Input() products: IProduct[] = [];

  @Output() addToOrder = new EventEmitter();
}
