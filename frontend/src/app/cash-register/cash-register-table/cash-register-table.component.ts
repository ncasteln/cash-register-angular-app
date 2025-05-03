import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'cash-register-table',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './cash-register-table.component.html',
  styleUrl: './cash-register-table.component.scss'
})
export class CashRegisterTableComponent {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/';

  @Input() products: IProduct[] = [];

  @Output() addToOrder = new EventEmitter();

}
