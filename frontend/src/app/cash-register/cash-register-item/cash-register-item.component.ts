import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { IProduct, IUnit, Product, TLayoutMode } from '../../models';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormControlDirective, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'cash-register-item',
  standalone: true,
  imports: [
    DecimalPipe,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './cash-register-item.component.html',
  styleUrl: './cash-register-item.component.scss'
})
export class CashRegisterItemComponent implements OnInit {
  readonly uploadsUrl = `${environment.productsUrl}/uploads/`
  @Input() product: IProduct = new Product();
  @Input() layoutMode: TLayoutMode = 'grid';
  @Input() isSelectedProduct: boolean = false;
  @Output() addToOrder = new EventEmitter();

  price = new FormControl<string | null>(null)
  weight = new FormControl<string | null>(null)
  discount = new FormControl<string | null>(null)

  @Output() onSelectProduct = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onAddToOrder() {
    this.addToOrder.emit({
      ...this.product,
      price: Number(this.price.value ? this.price.value : this.product.price),
      weight: Number(this.weight.value ? this.weight.value : this.product.weight),
      discount: Number(this.discount.value),
      quantity: -1
    })

    this.price.setValue(null)
    this.weight.setValue(null)
    this.discount.setValue(null)
  }

  addIsDisabled() {
    if (this.product.priceType === 'dynamic' && !this.price.value)
      return (true);
    if (this.product.weightType === 'dynamic' && !this.weight.value)
      return (true);
    return (false);
  }

  selectProduct() {
    if (this.layoutMode === 'table') return ;
    if (this.layoutMode === 'details')
      this.onSelectProduct.emit(null)
    else
      this.onSelectProduct.emit(this.product);
  }
}
