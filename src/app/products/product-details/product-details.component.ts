import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProduct, Product } from '../../models';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { ProductsService } from '../../service/products.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    ProductActionsComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct = new Product();
  productForm = new FormGroup({ // type it ! how can i do it ?
    _id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(-1),
    description: new FormControl(''),
    img: new FormControl(''),
    external: new FormControl(false),
    disabled: new FormControl(false),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productsService.getProductById(params['_id']).subscribe(p => {
        this.product = p.newProduct;
      });
    });
  }

  // /* UPDATE */
  // onEdit( index: number ) {
  //   if (this.products[index].disabled)
  //     return ;
  //   this.isEditMode.set(index);
  //   this.oldProduct.name = this.products[index].name;
  //   this.oldProduct.price = this.products[index].price;
  //   this.oldProduct.img = this.products[index].img;
  //   this.oldProduct.description = this.products[index].description;
  // }
  // onSave( index: number ) {
  //   this.isEditMode.set(-1);
  //   this.updateProduct(this.products[index]);
  // }
  // onCancel( index: number ) {
  //   this.isEditMode.set(-1);
  //   this.products[index].name = this.oldProduct.name;
  //   this.products[index].price = this.oldProduct.price;
  //   this.products[index].img = this.oldProduct.img;
  //   this.products[index].description = this.oldProduct.description;
  //   this.oldProduct.name = '';
  //   this.oldProduct.price = -1;
  //   this.oldProduct.img = '';
  //   this.oldProduct.description = '';
  // }

  /* UPLOAD IMG */
  uploadImage( i: number ) {
    // if (this.products[i].disabled)
    //   return ;
    // this._productsService.uploadImg(this.products[i]).subscribe(res => {
    //   if (this.showAlert('UPDATE', res.status, HttpStatusCode.Ok) == 0)
    //     this.getProducts();
    // }
  }

  save() {
    /* POST for one product */
  }

  cancel() {
    /* Clear the form of update */
    this.router.navigate(['/products']);
  }
}
