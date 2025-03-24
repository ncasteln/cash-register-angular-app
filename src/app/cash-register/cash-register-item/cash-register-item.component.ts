import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, IUnit, Product } from '../../models';
import { DecimalPipe } from '@angular/common';
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
    FormsModule
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
        price: this.price.value ? this.price.value : this.product.price,
        weight: this.weight.value ? this.weight.value : this.product.weight,
        discount: this.discount.value // convert directly ?
    })

    this.price.setValue(null)
    this.weight.setValue(null)
    this.discount.setValue(null)
  }
}
