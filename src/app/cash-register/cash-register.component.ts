import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IProduct } from '../products/products.component';
import { CashRegisterToolbarComponent } from '../cash-register-toolbar/cash-register-toolbar.component';

@Component({
  selector: 'app-cash-register',
  standalone: true,
  imports: [
    CashRegisterToolbarComponent
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent {
  productList: IProduct[] = [];

  constructor( private _productService: ProductsService ) {
    this._productService.getAll().subscribe(res => {
      this.productList = res;
    });
  }


}
