import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsToolbarComponent } from './products-toolbar/products-toolbar.component';
import { Category, IProduct, TLayoutMode } from '../models';
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
  filteredProducts: IProduct[] = [];
  selectedCat: Category | string = 'all'

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
    this._productsService.getProducts().subscribe(p => {
      this.products = p;
      this.filteredProducts = p;
    })
  }

  /* DELETE */
  deleteProduct( _id: string ) {
    this._productsService.delete(_id)
    .pipe(
      switchMap(() => this._productsService.getProducts()))
    .subscribe(p => {
      this.products = p;
      this.onCategoryChange(this.selectedCat)
    });
  }

  /* RESTORE */
  restoreProduct( _id: string ) {
    this._productsService.restore(_id)
    .pipe(
      switchMap(() => this._productsService.getProducts()))
    .subscribe(p => {
      this.products = p;
      this.onCategoryChange(this.selectedCat);
    });
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

  /* RESET */
  resetDatabase() {
    this._productsService.reset().subscribe(() => { this.getProducts() })
  }
}
