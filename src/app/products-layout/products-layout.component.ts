import { Component, Input, input } from '@angular/core';
import { IProduct, TDisplayMode } from '../models';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { DecimalPipe } from '@angular/common';
import { ProductActionsComponent } from '../products/product-actions/product-actions.component';

@Component({
  selector: 'products-layout',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    ProductActionsComponent
  ],
  templateUrl: './products-layout.component.html',
  styleUrl: './products-layout.component.scss'
})
export class ProductsLayoutComponent {
  @Input() productList: IProduct[] = [];
  @Input() layout: TDisplayMode = 'table';

}
