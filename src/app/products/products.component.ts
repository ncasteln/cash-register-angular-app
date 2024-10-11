import { Component, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CreateProductComponent } from '../create-product/create-product.component';

export interface IProduct {
  id: number,
  name: string,
  price: number,
  img: string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CreateProductComponent ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productList: IProduct[] | undefined;
  displayForm = signal(false);

  constructor( private _productsService: ProductsService ) {
    this.getData();
  }

  getData() {
    try {
      this._productsService.getProducts().subscribe(res => {
        this.productList = res;
        console.log("* Products fetched");
      });
    } catch (e) {
      console.error(e);
    }
  }

  /*
    - Open the modal and present the form
    - create-product comp collects data and triggers submit()
    { to simplify can use mock data }
    - submit() triggers the
  */
  // newProduct() {
  //   this.displayForm.set(true);
  // }
}
