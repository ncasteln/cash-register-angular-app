import { Component, Input } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productForm!: FormGroup; /* Meaning of ! ??? */

  constructor( private _productService: ProductsService ) {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl(''),
    })
  }

  submit() {
    /* Mostra riepilogo e chiedi conferma ? */

    this._productService.createProduct(this.productForm.value).subscribe(res => {
      console.log(res);
    });
  }
}
