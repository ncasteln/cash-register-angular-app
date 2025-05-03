import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, IUnit, Product } from '../../models';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormControlDirective, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/'
  @Input() product: IProduct = new Product();
  @Output() addToOrder = new EventEmitter();

  price = new FormControl(null)
  weight = new FormControl(null)
  discount = new FormControl(null)

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
    if (this.product.priceType === 1 && !this.price.value)
      return (true);
    if (this.product.weightType === 1 && !this.weight.value)
      return (true);
    return (false);
  }
}
