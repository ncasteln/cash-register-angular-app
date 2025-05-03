import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsToolbarComponent } from './products-toolbar/products-toolbar.component';
import { IProduct, TLayoutMode } from '../models';
import { switchMap } from 'rxjs';
import { ProductsLayoutComponent } from './products-layout/products-layout.component';
import { AsyncPipe } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ProductsToolbarComponent,
    ProductsLayoutComponent,
    AsyncPipe,
    ProductDetailsComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  /* View */
  layoutMode = signal<TLayoutMode>('table');
  toggleLayoutMode( newMode: TLayoutMode ) {
    this.layoutMode.set(newMode);
  }

  constructor(
    private _productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    // https://www.thisdot.co/blog/best-practices-for-managing-rxjs-subscriptions
    this.getProducts();
  }

  getProducts() {
    this._productsService.getProducts().subscribe(p => this.products = p)
  }

  /*
    TRY TO IMPROVE:

    use observables to have no problem with subscription
    and mem leaks


  */

  /* DELETE */
  deleteProduct( _id: string) {
    this._productsService.delete(_id)
    .pipe(
      switchMap(() => this._productsService.getProducts()))
    .subscribe(p => this.products = p);
  }

  /* RESET */
  resetDatabase() {
    this._productsService.reset().subscribe(() => { this.getProducts() })
  }
}
