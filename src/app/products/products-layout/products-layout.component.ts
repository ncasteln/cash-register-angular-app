import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { IProduct, TLayoutMode } from '../../models';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-layout',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    ProductActionsComponent,
    RouterLink,
    FormsModule,
    NgClass
  ],
  templateUrl: './products-layout.component.html',
  styleUrl: './products-layout.component.scss'
})
export class ProductsLayoutComponent {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/'
  @Input() products: IProduct[] = [];
  @Input() layout: TLayoutMode = 'table';
  @Output() delete = new EventEmitter<string>();

  constructor() {}
}
