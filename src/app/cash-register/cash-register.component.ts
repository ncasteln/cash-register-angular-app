import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IDay, IOrder, IProduct, TDisplayMode } from '../models';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { CashRegisterToolbarComponent } from './cash-register-toolbar/cash-register-toolbar.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-cash-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    FormsModule,
    DecimalPipe,
    CashRegisterToolbarComponent,
    DynamicTableComponent
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent implements OnInit {

  constructor( private _productService: ProductsService ) {}

  productList: IProduct[] = [];
  orderForm: IOrder[] = [];
  currentOrder: IOrder[] = [];
  displayMode: TDisplayMode = 'list';

  ngOnInit(): void {
    this._productService.getAll().subscribe(res => {
      this.productList = res.sort((a, b) => { return a.name > b.name ? 1 : a.name < b.name ? -1 : 0 });;
      this.createEmptyOrderForm();
    });
  }

  toggleDisplayMode( newMode: TDisplayMode ) {
    this.displayMode = newMode;
  }

  createEmptyOrderForm() {
    this.productList.forEach(item => {
      const { name, price } = item;
      item.external
        ? this.orderForm.push({ name, price: 0, weight: -1 }) //-1 means will be instered only the price, for ext prod
        : this.orderForm.push({ name, price, weight: 0 })
    })
  }

  addToOrder( i: number ) {
    if (this.orderForm[i].weight === 0) // sanitize input
      return ;

    const { name, price, weight } = this.orderForm[i];
    this.currentOrder.push({ name, price, weight });

    /* RESET ORDER FORM */
    if (this.orderForm[i].weight === -1)
      this.orderForm[i].price = 0;
    else
      this.orderForm[i].weight = 0;
  }

  removeFromOrder( i: number ) {
    this.currentOrder.splice(i, 1);
  }

  onSubmit() {
    console.log("* SUBMIT:");
  }
}

/*
export interface IDay {
  date: string,             // unique ID !!!
  weekOfTheYear: number,
  harvest: {
    products: IProduct[],
    totHarvestKg: number,
    totHarvestCash: number
  },
  sales: {
    orders: IOrder[],
    totSalesKg: number,
    totSalesCash: number
  }
  totDayKg: number,
  totDayCash: number
}
*/


/*
  createForm(): FormGroup {
    const form = new FormGroup({});
    this.productList.forEach(item => {
      form.addControl(item.name, new FormControl<number>(0));
    });
    return (form);
  }
  getOrderFormControl( name: string ) {
    return (this.orderForm.get(name) as FormControl);
  }
  getOrderFormValue() {
    return (this.orderForm.value);
  }

*/
