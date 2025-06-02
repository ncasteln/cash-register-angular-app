import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { Category, IProduct, TLayoutMode } from '../../models';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'products-layout',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    ProductActionsComponent,
    RouterLink,
    FormsModule,
    NgClass,
    ProductItemComponent
  ],
  templateUrl: './products-layout.component.html',
  styleUrl: './products-layout.component.scss'
})
export class ProductsLayoutComponent implements OnInit {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/'
  @Input() products: IProduct[] = [];
  @Input() layout: TLayoutMode = 'table';
  @Input() selectedCat: Category | string = 'all';
  @Output() delete = new EventEmitter<string>();
  @Output() restore = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }
}
