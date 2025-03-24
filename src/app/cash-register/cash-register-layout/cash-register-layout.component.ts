import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct, IUnit, TLayoutMode } from '../../models';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CashRegisterItemComponent } from '../cash-register-item/cash-register-item.component';

@Component({
  selector: 'cash-register-layout',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    MatFormFieldModule,
    MatSelectModule,
    CashRegisterItemComponent
  ],
  templateUrl: './cash-register-layout.component.html',
  styleUrl: './cash-register-layout.component.scss'
})
export class CashRegisterLayoutComponent {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/'
  @Input() products: IProduct[] = [];
  @Input() layout: TLayoutMode = 'table';

  @Output() addToOrder = new EventEmitter()

  constructor() {}

  onAddToOrder( unit: IUnit ) {
    this.addToOrder.emit(unit)
  }
}
