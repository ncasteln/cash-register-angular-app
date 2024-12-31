import { Component, Input } from '@angular/core';
import { IProduct } from '../../models';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'products-grid',
  standalone: true,
  imports: [
    ProductActionsComponent,
    DecimalPipe
  ],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss'
})
export class ProductsGridComponent {
  @Input() productList: IProduct[] = [];
}
