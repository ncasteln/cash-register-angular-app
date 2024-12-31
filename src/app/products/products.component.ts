import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { ProductsToolbarComponent } from './products-toolbar/products-toolbar.component';
import { IProduct, TLayoutMode } from '../models';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ProductActionsService } from '../service/product-actions.service';
import { ProductsLayoutComponent } from './products-layout/products-layout.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,  /* [(ngModel)] */
    ReactiveFormsModule,
    ProductsToolbarComponent,
    ProductsLayoutComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = []; // substitute with signal?
  oldProduct: IProduct = {
    name: '',
    price: -1,
    img: '',
    alt: '',
    disabled: false,
    external: false
  };
  postForm!: FormGroup;

  /* Signals */
  isEditMode = signal(-1);

  /* View */
  layoutMode = signal<TLayoutMode>('table');
  toggleLayoutMode( newMode: TLayoutMode ) {
    this.layoutMode.set(newMode);
  }

  lastAction: string[] = [];

  constructor(
    private _productsService: ProductsService,
    private _productsActions: ProductActionsService
  ) {
    this.postForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      external: new FormControl(false)
      /* Shoul complete with other fields ??? */
    })

  }

  ngOnInit(): void {
    this.getProducts();


    this._productsActions.selectedAction$.pipe(
      tap(action => console.log(action))
    ).subscribe(action => {
      if (action[0] === 'delete') {
        const arr = this.products.filter(p => p.name === action[1])
        this._productsService.delete(arr[0]).subscribe(v => {
          console.log(v)
        })
      }
      this.getProducts();
    })

  }

  /* GET ALL */
  getProducts() {
    this._productsService.getAll().subscribe(res => {
      this.products = res.sort((a, b) => { return a.name > b.name ? 1 : a.name < b.name ? -1 : 0 });
    });
  }

  showAlert( method: string, res: HttpStatusCode, expected: HttpStatusCode ) {
    if (res !== expected) {
      alert(`${method} operation: fail!`);
      return (1);
    }
    alert(`${method} operation: success!`);
    return (0);
  }

  /* CREATE */
  createProduct() {
    this._productsService.create(this.postForm.value)
    .pipe(
      retry(3),
      catchError(err => {
        alert(`Creazione prodotto fallita: ${err.error.msg}`)
        return throwError(() => new Error(err.error.msg));
      })
    )
    .subscribe(res => {
      this.getProducts();
    });
  }

  /* UPDATE */
  onEdit( index: number ) {
    if (this.products[index].disabled)
      return ;
    this.isEditMode.set(index);
    this.oldProduct.name = this.products[index].name;
    this.oldProduct.price = this.products[index].price;
    this.oldProduct.img = this.products[index].img;
    this.oldProduct.alt = this.products[index].alt;
  }
  onSave( index: number ) {
    this.isEditMode.set(-1);
    this.updateProduct(this.products[index]);
  }
  onCancel( index: number ) {
    this.isEditMode.set(-1);
    this.products[index].name = this.oldProduct.name;
    this.products[index].price = this.oldProduct.price;
    this.products[index].img = this.oldProduct.img;
    this.products[index].alt = this.oldProduct.alt;
    this.oldProduct.name = '';
    this.oldProduct.price = -1;
    this.oldProduct.img = '';
    this.oldProduct.alt = '';
  }
  updateProduct( newProduct: IProduct ) {
    this._productsService.update(this.oldProduct, newProduct).subscribe(res => {
      if (this.showAlert('UPDATE', res.status, HttpStatusCode.Ok) == 0)
        this.getProducts();
    });
  }

  disableProduct( index: number ) {
    // this._productsService.disable(this.products[index]).subscribe(res => {
      // if (this.showAlert('UPDATE', res.status, HttpStatusCode.Ok) == 0)
        // this.getProducts();
    // });
  }

  /* DELETE */
  deleteProduct( index: number ) {
    if (this.products[index].disabled)
      return ;
    this._productsService.delete(this.products[index]).subscribe(res => {
      if (this.showAlert('DELETE', res.status, HttpStatusCode.Ok) == 0)
        this.getProducts();
    });
  }

  /* UPLOAD IMG */
  uploadImage( i: number ) {
    // if (this.products[i].disabled)
    //   return ;
    // this._productsService.uploadImg(this.products[i]).subscribe(res => {
    //   if (this.showAlert('UPDATE', res.status, HttpStatusCode.Ok) == 0)
    //     this.getProducts();
    // }

  }

  /* RESET */
  resetDatabase() {
    this._productsService.reset().subscribe(res => { this.getProducts(); });
  }
}
