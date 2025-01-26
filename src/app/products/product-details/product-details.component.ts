import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IProduct, Product } from '../../models';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { map, switchMap, tap } from 'rxjs';
import { KeyValuePipe } from '@angular/common';

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
    KeyValuePipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productForm!: FormGroup;
  products: IProduct[] = [];
  product: IProduct | undefined;

  constructor(
    private _formBuilder: FormBuilder,
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
          this.generateForm();
        }
        return products;
      })
    )
    .subscribe(products => {
      this.products = products;
    });

  }

  generateForm() {
    /* Add validation:
      - name: no dups, no only whitespaces
      Transform input:
      - Trim every white space start/end
      - name to CamelCase
    */
    if (this.product) {
      this.productForm = this._formBuilder.group({
        name: new FormControl(this.product.name, [ Validators.required ]),
        price: new FormControl(this.product.price, [ Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/) ]),
        external: new FormControl(this.product.external, [ Validators.required ]),
        disabled: new FormControl(this.product.disabled),
      })
    }
    else {
      this.productForm = this._formBuilder.group({
        name: new FormControl(null, [ Validators.required ]),
        price: new FormControl(null, [ Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/) ]),
        external: new FormControl(false, [ Validators.required ]),
        disabled: new FormControl(false),
      })
    }
  }

  save() {
    const updateProduct: IProduct = this.productForm.value;
  }

  create() {
    const newProduct: IProduct = this.productForm.value;
    this._productsService.create(newProduct).subscribe(res => {
      this._router.navigate(['/products'])
    })
  }

  cancel() {
    this._router.navigate(['/products']);
  }
}
