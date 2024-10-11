import { Component, Input } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  newProduct = {
    id: -1,
    name: "test",
    price: -1,
    img: ""
  }

  constructor( private _productService: ProductsService ) {}

  submit() {
    console.log("* Submit handler!")
    this._productService.createProduct(this.newProduct).subscribe(res => {
      console.log(res);
    });
  }
}
