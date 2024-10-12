import { Component, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

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
    UpdateProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productList: IProduct[] | undefined;
  displayPostForm = signal(false);
  displayUpdateForm = signal(-1);

  constructor( private _productsService: ProductsService ) {
    this.getData();
  }

  getData() {
    try {
      this._productsService.getAllProducts().subscribe(res => {
        this.productList = res;
      });
    } catch (e) {
      console.error(e);
    }
  }

  postProduct() {
    /* Close unrelated forms */
    this.displayUpdateForm.set(-1);
    this.displayPostForm.set(true);
  }

  updateProduct( index: number ) {
    /* Close all unrelated forms */
    this.displayPostForm.set(false);
    this.displayUpdateForm.set(index);

    if (!this.productList || !this.productList[index]) {
      throw Error("Product id out of range")
    }
    console.log("* Want to update: ", this.productList[index].name);
    /* TO IMPLEMENT ! */
    // try {
    //   this._productsService.updateProduct(this.productList[index]).subscribe(res => {
    //     console.log(res);
    //   })
    // } catch (e) {
    //   console.error(e);
    // }
  }

  deleteProduct( index: number ) {
    /* Close all unrelated forms */
    this.displayPostForm.set(false);
    this.displayUpdateForm.set(-1);

    if (!this.productList || !this.productList[index]) {
      throw Error("Product id out of range")
    }
    console.log("* Want to delete: ", this.productList[index].name);
    /* TO IMPLEMENT ! */
  }
}
