import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cash-register-list',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './cash-register-list.component.html',
  styleUrl: './cash-register-list.component.scss'
})
export class CashRegisterListComponent {
  @Input() productList: IProduct[] = [];

  @Output() addToOrder = new EventEmitter();

}
