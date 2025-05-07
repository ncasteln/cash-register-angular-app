import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IUnit, IProduct, TLayoutMode, Category } from '../models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe, NgClass } from '@angular/common';
import { CashRegisterToolbarComponent } from './cash-register-toolbar/cash-register-toolbar.component';
import { CashRegisterGridComponent } from './cash-register-grid/cash-register-grid.component';
import { CashRegisterTableComponent } from './cash-register-table/cash-register-table.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { CashRegisterLayoutComponent } from './cash-register-layout/cash-register-layout.component';
import { OrdersService } from '../service/orders.service';

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
    CashRegisterLayoutComponent,
    NgClass
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  total = signal(0);
  currentUnits: IUnit[] = [];

  /* View */
  layoutMode = signal<TLayoutMode>('table');

  /* Category */
  selectedCat: Category | string = 'all'

  constructor(
    private _productService: ProductsService,
    private _ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._productService.getProducts()
    .subscribe(res => {
      this.products = res.filter(p => !p.disabled && !p.deleted);
      this.filteredProducts = this.products;
    });
  }

  toggleDisplayMode( newMode: TLayoutMode ) {
    this.layoutMode.set(newMode);
  }

  onCategoryChange( newCat: Category | string ) {
    this.selectedCat = newCat;

    if (newCat === 'all') {
      this.filteredProducts = this.products;
      return ;
    }
    this.filteredProducts = this.products.filter(p => {
      if (newCat === 'deleted')
        return p.deleted;
      return p.category === newCat;
    })
  }

  onAddToOrder( newUnit: IUnit ) {
    /*  DOMANDA per JAck/Nic: cosa succede se aggiungo ad es.
        1)
        1.00kg cipolle 0% sconto
        1.00kg cipolle 30% sconto
        il totale sarà 1.70kg ma lo sconto differente;
        Salvo dati completi, oppure solo un boolean, oppure altro?

        2) Esiste il caso in cui il prezzo è dinamico ma il peso no?
    */
    const purchasedUnit = this.currentUnits.find(u => u._id === newUnit._id);
    if (purchasedUnit) {
      if (newUnit.weightType === 'fixed')
        purchasedUnit.quantity += 1;
      purchasedUnit.weight += newUnit.weight;

      let subtotal = 0;
      if (newUnit.weightType === 'dynamic' && newUnit.priceType === 'dynamic' ||
        newUnit.weightType === 'fixed' && newUnit.priceType === 'fixed'
      ) {
        subtotal = this.setDiscount(newUnit.price, newUnit.discount);
      } else {
        subtotal = this.setDiscount(newUnit.weight*newUnit.price, newUnit.discount)
      }

      purchasedUnit.subtotal += subtotal;
      this.total.update(t => t + subtotal)
    }
    else {
      if (newUnit.weightType === 'fixed')
        newUnit.quantity = 1;
      if (newUnit.weightType === 'dynamic' && newUnit.priceType === 'dynamic' ||
        newUnit.weightType === 'fixed' && newUnit.priceType === 'fixed'
      ) {
        newUnit.subtotal = this.setDiscount(newUnit.price, newUnit.discount);
      }
      else {
        newUnit.subtotal = this.setDiscount(newUnit.weight*newUnit.price, newUnit.discount);
      }
      this.total.update(t => t + newUnit.subtotal)
      this.currentUnits.push(newUnit)
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
    this.total.update(t => t - this.currentUnits[i].subtotal);
    this.currentUnits.splice(i, 1);
  }

  onSubmit() {
    console.log("* onSubmit()")
    console.log(this.currentUnits)
    // this._ordersService.create(this.currentUnits).subscribe(o => {
    //   // print successful message
    //   this.currentUnits = [];
    //   this.total.set(0);
    // })
  }
}
