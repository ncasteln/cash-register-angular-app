import { Component, EventEmitter, Input, Output } from '@angular/core';
import { categories, Product } from '../../models';
import { DecimalPipe, NgClass } from '@angular/common';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [
    DecimalPipe,
    ProductActionsComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/';
  readonly categories = categories;
  @Input() product = new Product();
  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();

  constructor() {}
}
