import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IUnit, IProduct, TLayoutMode } from '../models';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { CashRegisterToolbarComponent } from './cash-register-toolbar/cash-register-toolbar.component';
import { CashRegisterGridComponent } from './cash-register-grid/cash-register-grid.component';
import { CashRegisterTableComponent } from './cash-register-table/cash-register-table.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { CashRegisterLayoutComponent } from './cash-register-layout/cash-register-layout.component';

@Component({
  selector: 'cash-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    FormsModule,
    DecimalPipe,
    CashRegisterToolbarComponent,
    CashRegisterGridComponent,
    CashRegisterTableComponent,
    DynamicTableComponent,
    CashRegisterLayoutComponent
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent implements OnInit {
  products: IProduct[] = [];
  units: IUnit[] = [];

  orderForm: IUnit[] = [];
  currentOrder: IUnit[] = [];
  currentOrderForm!: FormGroup;

  /* View */
  layoutMode = signal<TLayoutMode>('table');

  constructor( private _productService: ProductsService ) {}

  ngOnInit(): void {
    this._productService.getProducts().subscribe(res => {
      this.products = res.filter(p => !p.disabled).sort((a, b) => { return a.name > b.name ? 1 : a.name < b.name ? -1 : 0 });
      this.generateForm();
    });
  }

  toggleDisplayMode( newMode: TLayoutMode ) {
    this.layoutMode.set(newMode);
  }

  generateForm() {
    // this.products.forEach(item => {
    //   const { name, price } = item;
    //   item.external
    //     ? this.orderForm.push({ name, price: 0, weight: -1 }) //-1 means will be instered only the price, for ext prod
    //     : this.orderForm.push({ name, price, weight: 0 })
    // })
  }

  onAddToOrder( unit: IUnit ) {
    console.log(unit)

    //hERE
    this.currentOrder.push(unit)

    // const { name, price, weight, external, tax } = p;

    // this.currentOrder.push({
    //   name,
    //   price,
    //   weight,
    //   external,
    //   tax,
    //   discount: 0,
    //   subtotal: 0
    // })

    // const { name, price, weight } = this.orderForm[i];
    // this.currentOrder.push({ name, price, weight });

    // /* RESET ORDER FORM */
    // if (this.orderForm[i].weight === -1)
    //   this.orderForm[i].price = 0;
    // else
    //   this.orderForm[i].weight = 0;
  }

  removeFromOrder( i: number ) {
    this.currentOrder.splice(i, 1);
  }

  onSubmit() {
    console.log("* SUBMIT:");
    console.log(this.currentOrder)
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
    orders: IUnit[],
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
    this.products.forEach(item => {
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
