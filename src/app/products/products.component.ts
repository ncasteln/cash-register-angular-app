import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { ProductsToolbarComponent } from './products-toolbar/products-toolbar.component';
import { IProduct, IProductResponse, Product, TLayoutMode } from '../models';
import { catchError, map, Observable, retry, switchMap, take, tap, throwError } from 'rxjs';
import { ProductActionsService } from '../service/product-actions.service';
import { ProductsLayoutComponent } from './products-layout/products-layout.component';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,  /* [(ngModel)] */
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

    this._productsService.action$
    .subscribe(({action, product}) => {
      if (action === 'delete')
        this.deleteProduct(product);
      else if (action === 'disable')
        this.disableProduct(product);
    })
  }

  getProducts() {
    this._productsService.getProducts().subscribe(p => this.products = p)
  }

  disableProduct( product: IProduct ) {
    this._productsService.disable(product)
    .pipe(
      tap(res => console.log(res)),
      // catchError(),
      switchMap(() => this._productsService.getProducts()))
    .subscribe(p => this.products = p);
  }

  /* DELETE */
  deleteProduct( p: IProduct ) {
    this._productsService.delete(p)
    .pipe(
      tap(res => console.log(res)), // use returned body to show dialog
      switchMap(() => this._productsService.getProducts()))
    .subscribe(p => this.products = p);
  }

  /* RESET */
  resetDatabase() {
    this._productsService.reset().subscribe(() => { this.getProducts() })
  }
}
