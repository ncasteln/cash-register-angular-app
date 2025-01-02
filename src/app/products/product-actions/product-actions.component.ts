import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, Product } from '../../models';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { NgClass } from '@angular/common';
import { ProductActionsService } from '../../service/product-actions.service';

@Component({
  selector: 'product-actions',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './product-actions.component.html',
  styleUrl: './product-actions.component.scss'
})
export class ProductActionsComponent implements OnInit {
  // @Output() onDelete = new EventEmitter<IProduct>()

  @Input() product: IProduct = new Product();

  constructor( private _productActions: ProductActionsService ) {}

  ngOnInit(): void {
    /* Substitute with getByID ? */
  }

  disable() {
    this._productActions.select('disable', this.product.name);
  }

  delete() {
    this._productActions.select('delete', this.product.name);
  }
}
