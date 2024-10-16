import { Component, OnInit, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface IProduct {
  name: string,
  price: number,
  img: string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CreateProductComponent,
    FormsModule /* [(ngModel)] */
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

  /* Signals */
  displayGrid = signal(false);
  isEditMode = signal(-1);

  constructor( private _productsService: ProductsService ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  /* GET */
  getProductList() {
    try {
      this._productsService.getAllProducts().subscribe(res => {
        this.productList = res;
      });
    } catch (e) {
      console.error(e);
    }
  }

  // getOneProduct( id: string ) {
  //   this._productsService.getProductById(id).subscribe(res => {
  //     console.log(res)
  //   })
  // }

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
    this._productsService.updateProduct(this.oldProduct, newProduct).subscribe(res => {
      console.log("* Status: ", res.status);
      console.log("* Body:   ", res.body);
    });
  }

  /* DELETE */
  deleteProduct( index: number ) {
    this._productsService.deleteProduct(this.productList[index]).subscribe(res => {
      console.log("* Attempting to delete: ", this.productList[index].name);
    })
  }
}
