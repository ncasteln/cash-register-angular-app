import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IUnit, IProduct, TLayoutMode, Category } from '../models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe, KeyValuePipe, NgClass } from '@angular/common';
import { CashRegisterToolbarComponent } from './cash-register-toolbar/cash-register-toolbar.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { OrdersService } from '../service/orders.service';
import { CashRegisterItemComponent } from './cash-register-item/cash-register-item.component';

@Component({
  selector: 'cash-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    FormsModule,
    DecimalPipe,
    CashRegisterToolbarComponent,
    DynamicTableComponent,
    NgClass,
    CashRegisterItemComponent
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent implements OnInit {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/'
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  total = signal(0);
  currentUnits: IUnit[] = [];

  /* View */
  layoutMode = signal<TLayoutMode>('grid');

  /* Category */
  selectedCat: Category | string = 'all'

  /* Selected product */
  selectedProduct: IProduct | null = null;

  constructor(
    private _productService: ProductsService,
    private _ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._productService.getProducts()
    .subscribe(res => {
      this.products = res.filter(p => !p.disabled && !p.deleted);
      this.filteredProducts = this.products.sort((a, b) => a.name > b.name ? 1 : -1);
    });
  }

  toggleDisplayMode( newMode: TLayoutMode ) {
    this.layoutMode.set(newMode);
  }

  onCategoryChange( newCat: Category | string ) {
    this.selectedProduct = null;
    this.selectedCat = newCat;

    if (newCat === 'all') {
      this.filteredProducts = this.products.sort((a, b) => a.name > b.name ? 1 : -1);
      return ;
    }
    this.filteredProducts = this.products.filter(p => {
      if (newCat === 'deleted')
        return p.deleted;
      return p.category === newCat;
    })
    .sort((a, b) => a.name > b.name ? 1 : -1)
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

    this.selectedProduct = null;
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

  onSelectProduct( p: IProduct ) {
    this.selectedProduct = p;

  }

  onSubmit() {
    console.log("* onSubmit()")
    console.log(this.currentUnits)
    this._ordersService.create(this.currentUnits).subscribe(o => {
      // print successful message
      this.currentUnits = [];
      this.total.set(0);
    })
  }

  price = new FormControl<string | null>(null)
  weight = new FormControl<string | null>(null)
  discount = new FormControl<string | null>(null)

  addSelectedProduct() {
    /* IMPLEMENT */
    // this.addToOrder.emit({
    //   ...this.product,
    //   price: Number(this.price.value ? this.price.value : this.product.price),
    //   weight: Number(this.weight.value ? this.weight.value : this.product.weight),
    //   discount: Number(this.discount.value),
    //   quantity: -1
    // })

    this.price.setValue(null)
    this.weight.setValue(null)
    this.discount.setValue(null)
  }

  addIsDisabled() {
    if (this.selectedProduct?.priceType === 'dynamic' && !this.price.value)
      return (true);
    if (this.selectedProduct?.weightType === 'dynamic' && !this.weight.value)
      return (true);
    return (false);
  }

}
