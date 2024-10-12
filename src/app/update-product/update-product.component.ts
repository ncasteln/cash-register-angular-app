import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../products/products.component';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  @Input() name = '';
  @Input() price = -1;
  @Input() img = '';

  productForm!: FormGroup;

  constructor( private _productService: ProductsService ) {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl(''),
    })
  }

  submit() {
    /* Mostra riepilogo e chiedi conferma ? */

    // this._productService.createProduct(this.productForm.value).subscribe(res => {
    //   console.log(res);
    // });
  }
}
