import { Component, Input, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IProduct, TLayoutMode } from '../../models';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { ProductActionsComponent } from '../product-actions/product-actions.component';

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
  @Input() products: IProduct[] = [];
  @Input() layout: TLayoutMode = 'table';

}
