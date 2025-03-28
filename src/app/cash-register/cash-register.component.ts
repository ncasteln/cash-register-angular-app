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
  total = signal(0);

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
    /*  DOMANDA per JAck/Nic: cosa succede se aggiungo ad es.
        1.00kg cipolle 0% sconto
        1.00kg cipolle 30% sconto
        il totale sarà 1.70kg ma lo sconto differente;
        Salvo dati completi, oppure solo un boolean, oppure altro?
    */

    console.log(unit)
    const purchasedUnit = this.currentOrder.find(u => u._id === unit._id);
    if (purchasedUnit) {
      if (unit.weightType === 0)
        purchasedUnit.quantity += 1;
      const subtotal = this.setDiscount(unit.weight*unit.price, unit.discount)
      purchasedUnit.subtotal += subtotal;
      this.total.update(t => t + subtotal)
    }
    else {
      if (unit.weightType === 0)
        unit.quantity = 1;
      if (unit.weightType === 1 && unit.priceType === 1) {
        unit.subtotal = this.setDiscount(unit.price, unit.discount);
      }
      else {
        unit.subtotal = this.setDiscount(unit.weight*unit.price, unit.discount);
      }
      this.total.update(t => t + unit.subtotal)
      this.currentOrder.push(unit)
    }
  }

  setDiscount( subtotal: number, discount: number ) {
    if (discount)
      return (subtotal-((subtotal*discount)/100))
    return (subtotal)
  }

  setSubtotal( unit: IUnit ) {
    return (unit.price * unit.weight)
  }

  removeFromOrder( i: number ) {
    this.currentOrder.splice(i, 1);
    // update the total
  }

  onSubmit() {
    console.log("* SUBMIT:");
    console.log(this.currentOrder)
  }
}
