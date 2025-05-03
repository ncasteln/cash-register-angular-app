import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct, Product } from '../../models';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { NgClass } from '@angular/common';

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
  @Output() delete = new EventEmitter<string>();
  @Output() restore = new EventEmitter<string>();

  constructor( private _productsService: ProductsService ) {}

  onDisable() {
    this._productsService.disable(this.product._id).subscribe(res => {
      this.product.disabled = res.newProduct.disabled;
    })
  }

  onDelete() {
    this.delete.emit(this.product._id)
  }
  onRestore() {
    this.restore.emit(this.product._id)
  }
}
