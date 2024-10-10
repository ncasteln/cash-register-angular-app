import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';

export interface IProduct {
  id: number,
  name: string,
  price: number,
  img: string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productList: IProduct[] | undefined;

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
}
