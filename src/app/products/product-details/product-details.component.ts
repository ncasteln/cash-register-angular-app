import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IProduct } from '../../models';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { map } from 'rxjs';
import { KeyValuePipe, NgClass } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TrimDirective } from '../../directives/trim.directive';

function duplicateValidator( products: IProduct[] ): ValidatorFn {
  const productNames = products.map(p => p.name.trim());

  return (control: AbstractControl): ValidationErrors | null => {
    const duplicate = productNames.includes(control.value)
    return duplicate ? {duplicateName: {value: control.value}} : null;
  };
}

const trimValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value || control.value === '')
    return (null);
  if (control.value.startsWith(' '))
    control.setValue(control.value?.trimStart(), { emitEvent: false, onlySelf: true });
  return (null);
}

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
    NgxMatFileInputModule,
    TrimDirective
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  readonly uploadsPath = 'http://localhost:3000/api/products/uploads/';

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
        if (product)
          this.product = product;
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
      - name:
        no dups OK
        no only whitespaces --- TRIM ONLY START
      Transform input:
      - Trim every white space start/end
    */
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name ?? null, [ Validators.required, trimValidator, duplicateValidator(this.products) ]),
      price: new FormControl(this.product?.price ?? null, [ Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/) ]),
      external: new FormControl(this.product?.external ?? false, [ Validators.required ]),
      disabled: new FormControl(this.product?.disabled ?? false),
      id: new FormControl(this.product?._id ?? null),
      imageFile: new FormControl(this.product?.img ?? null),
    })
  }

  save() {
    const formData = new FormData();
    const imageFile: File = this.productForm.get('imageFile')?.value;

    formData.append('imageFile', imageFile);

    let trimmedName = this.productForm.get('name')?.value.trim();
    formData.append('name', trimmedName)

    formData.append('price', this.productForm.get('price')?.value)

    formData.append('external', this.productForm.get('external')?.value)
    formData.append('disabled', this.productForm.get('disabled')?.value)

    if (this.product) {
      this._productsService.update(this.product._id, formData).subscribe(p => {
        this._router.navigate(['/products']);
      })
    }
    else {
      this._productsService.create(formData).subscribe(res => {
        this._router.navigate(['/products'])
      })
    }
  }

  cancel() {
    this._router.navigate(['/products']);
  }
}
