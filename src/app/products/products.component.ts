import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { IProduct } from '../models';
import { catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,  /* [(ngModel)] */
    ReactiveFormsModule,
    ToolbarComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productList: IProduct[] = [];
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
  displayMode = 'list';
  toggleDisplayModeParent( event: 'list' | 'grid' ) { this.displayMode = event; }

  constructor( private _productsService: ProductsService ) {
    this.postForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      external: new FormControl(false)
      /* Shoul complete with other fields ??? */
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  /* GET ALL */
  getProducts() {
    this._productsService.getAll().subscribe(res => {
      this.productList = res.sort((a, b) => { return a.name > b.name ? 1 : a.name < b.name ? -1 : 0 });
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
    if (this.productList[index].disabled)
      return ;
    this.isEditMode.set(index);
    this.oldProduct.name = this.productList[index].name;
    this.oldProduct.price = this.productList[index].price;
    this.oldProduct.img = this.productList[index].img;
    this.oldProduct.alt = this.productList[index].alt;
  }
  onSave( index: number ) {
    this.isEditMode.set(-1);
    this.updateProduct(this.productList[index]);
  }
  onCancel( index: number ) {
    this.isEditMode.set(-1);
    this.productList[index].name = this.oldProduct.name;
    this.productList[index].price = this.oldProduct.price;
    this.productList[index].img = this.oldProduct.img;
    this.productList[index].alt = this.oldProduct.alt;
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
    this._productsService.disable(this.productList[index]).subscribe(res => {
      // if (this.showAlert('UPDATE', res.status, HttpStatusCode.Ok) == 0)
        this.getProducts();
    });
  }

  /* DELETE */
  deleteProduct( index: number ) {
    if (this.productList[index].disabled)
      return ;
    this._productsService.delete(this.productList[index]).subscribe(res => {
      if (this.showAlert('DELETE', res.status, HttpStatusCode.Ok) == 0)
        this.getProducts();
    });
  }

  /* RESET */
  resetDatabase() {
    this._productsService.reset().subscribe(res => { this.getProducts(); });
  }
}
