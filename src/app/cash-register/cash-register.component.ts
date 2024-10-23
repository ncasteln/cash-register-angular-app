import { Component, computed, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IOrder, ICurrentOrder, IProduct } from '../models';
import { DecimalPipe, formatDate } from '@angular/common';
import { TranslateDatePipe } from '../translate-date.pipe';

@Component({
  selector: 'cash-register',
  standalone: true,
  imports: [
    TranslateDatePipe,
    DecimalPipe
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent implements OnInit {
  displayMode = signal<'list'|'grid'>('list');
  productList: IProduct[] = [];
  currentOrder: ICurrentOrder[] = [];
  dateToDisplay: string | null = null;
  id_date: string | null = null;
  fullDate: string | null = null;

  constructor( private _productService: ProductsService ) {}

  ngOnInit(): void {
    this._productService.getAll().subscribe(res => {
      this.productList = res;
    });

    /* DATE */
    const today = Date.now();
    this.fullDate = formatDate(today, 'fullDate', 'en-US');
    this.id_date = formatDate(today, 'dd-MM-yyyy', 'en-US');

    /* CREATE DATE ENTRY IN MONGODB */
  }

  checkQuantity( name: string ) {
    const product: ICurrentOrder | undefined = this.order.products.find(item => item.name === name);
    if (product === undefined)
      return ('0');
    return (product.quantity)
  }

  addProductToOrder( name: string ) {
    /* Product exist */
    const productIndex = this.productList.findIndex(product => product.name === name)
    if (productIndex === -1)
      return (console.error('product not in the list'));

    /* Product already in current order */
    const currentProduct: ICurrentOrder | undefined = this.order.products.find(item => item.name === name);
    if (currentProduct === undefined)
      this.order.products.push({ ...this.productList[productIndex], quantity: 1 });
    else
      currentProduct.quantity += 1;

    /* Update total */
    this.order.total += this.productList[productIndex].price;
  }

  removeProductFromOrder( name: string ) {
    /* Product exist */
    const productIndex = this.productList.findIndex(product => product.name === name)
    if (productIndex === -1)
      return (console.error('product not in the list'));

    /* Product already in current order */
    const currentProduct: ICurrentOrder | undefined = this.order.products.find(item => item.name === name);
    if (currentProduct === undefined)
      return ;
    if (currentProduct.quantity > 0) {
      currentProduct.quantity -= 1;
      this.order.total -= currentProduct.price;
    }

    /* Remove from bill */
    if (currentProduct.quantity === 0)
      this.order.products.splice(this.order.products.indexOf(currentProduct), 1);
  }

  order: IOrder = {
    _id: 't749t8hnv39',
    cassa: true,
    products: [
      { name: 'spinaci', price: 1, quantity: 1, img:'', alt: '' },
      { name: 'broccoli', price: 1, quantity: 1, img:'', alt: '' },
      { name: 'carrot', price: 1, quantity: 1, img:'', alt: '' },
    ],
    total: 3
  }

  submit() {
    console.log("Submitted")
  }
}
