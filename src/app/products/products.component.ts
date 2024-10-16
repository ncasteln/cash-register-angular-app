import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';

export interface IProduct {
  name: string,
  price: number,
  img: string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,  /* [(ngModel)] */
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productList: IProduct[] = [];
  oldProduct: IProduct = {
    name: '',
    price: -1,
    img: ''
  };
  postForm!: FormGroup;

  /* Signals */
  displayGrid = signal(false);
  isEditMode = signal(-1);

  constructor( private _productsService: ProductsService ) {
    this.postForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  /* GET ALL */
  getProducts() {
    this._productsService.getAll().subscribe(res => {
      this.productList = res;
    });
  }

  /* GET ONE */
  // getOneProduct( id: string ) {
  //   this._productsService.getProductById(id).subscribe(res => {
  //     console.log(res)
  //   })
  // }

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
    this._productsService.create(this.postForm.value).subscribe(res => {
      if (this.showAlert("POST", res.status, HttpStatusCode.Created) == 0)
        this.getProducts();
    });
  }

  /* UPDATE */
  onEdit( index: number ) {
    this.isEditMode.set(index);
    this.oldProduct.name = this.productList[index].name;
    this.oldProduct.price = this.productList[index].price;
    this.oldProduct.img = this.productList[index].img;
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
    this.oldProduct.name = '';
    this.oldProduct.price = -1;
    this.oldProduct.img = '';
  }
  updateProduct( newProduct: IProduct ) {
    this._productsService.update(this.oldProduct, newProduct).subscribe(res => {
      if (this.showAlert('UPDATE', res.status, HttpStatusCode.Ok) == 0)
        this.getProducts();
      });
  }

  /* DELETE */
  deleteProduct( index: number ) {
    this._productsService.delete(this.productList[index]).subscribe(res => {
      if (this.showAlert('DELETE', res.status, HttpStatusCode.Ok) == 0)
        this.getProducts();
      });
  }
}
