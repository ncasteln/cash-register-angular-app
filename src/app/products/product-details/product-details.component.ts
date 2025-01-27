import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { map } from 'rxjs';
import { KeyValuePipe, NgClass } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatHint,
    KeyValuePipe,
    NgClass,
    NgxMatFileInputModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productForm!: FormGroup;
  imageForm!: FormGroup;
  products: IProduct[] = [];
  product: IProduct | undefined;

  constructor(
    private _productsService: ProductsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._productsService.getProducts()
    .pipe(
      map(products => {
        const productId = this._activatedRoute.snapshot.paramMap.get('_id');
        const product = products.find(p => p._id === productId);
        if (product) {
          this.product = product;
        }
        return products;
      })
    )
    .subscribe(products => {
      this.products = products;
      this.generateForms();
    });

  }

  generateForms() {
    /* Add validation:
      - name: no dups, no only whitespaces, only alphabetical
      Transform input:
      - Trim every white space start/end
      - name to CamelCase
    */
    if (this.product) {
      this.productForm = new FormGroup({
        name: new FormControl(this.product.name, [ Validators.required ]),
        price: new FormControl(this.product.price, [ Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/) ]),
        external: new FormControl(this.product.external, [ Validators.required ]),
        disabled: new FormControl(this.product.disabled),
        id: new FormControl(this.product._id),
        img: new FormControl(this.product.img),
      })

      /* Image form */
      this.imageForm = new FormGroup({
        id: new FormControl(this.product._id),
        img: new FormControl(this.product.img)
      })
    }
    else {
      this.productForm = new FormGroup({
        name: new FormControl(null, [ Validators.required ]),
        price: new FormControl(null, [ Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/) ]),
        external: new FormControl(false, [ Validators.required ]),
        disabled: new FormControl(false, [ Validators.required ]),
      })
    }

  }

  save() {
    const updatedProduct: IProduct = this.productForm.value;

    if (this.product) {
      this._productsService.update(this.product, updatedProduct).subscribe(p => {
        this._router.navigate(['/products']);
      })
    }
  }

  create() {
    const newProduct: IProduct = this.productForm.value;
    if (!this.productForm.valid)
      return ;
    this._productsService.create(newProduct).subscribe(res => {
      this._router.navigate(['/products'])
    })
  }

  uploadImage() {
    const imageFile: File = this.imageForm.value;
    const formData = new FormData();
    if (!this.product)
      return;
    formData.append('id', this.product?._id);
    formData.append('name', 'upload_image');
    formData.append('file', imageFile);
    this._productsService.uploadImage(formData).subscribe(res => {
      console.log(res)
    })
  }

  cancel() {
    this._router.navigate(['/products']);
  }
}
