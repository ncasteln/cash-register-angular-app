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
export class ProductActionsComponent {
  @Input() product: IProduct = new Product();

  constructor( private _productsService: ProductsService ) {}

  disable() {
    this._productsService.action('disable', this.product);
  }

  delete() {
    this._productsService.action('delete', this.product);
  }


}
