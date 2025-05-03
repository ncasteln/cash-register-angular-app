import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models';
import { DecimalPipe, NgClass } from '@angular/common';
import { ProductActionsComponent } from '../product-actions/product-actions.component';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [
    DecimalPipe,
    ProductActionsComponent,
    NgClass
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/';
  @Input() product = new Product();
  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();

  constructor() {}
}
