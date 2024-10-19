import { Component, computed, signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { IProduct } from '../products/products.component';

/* Client
{
  "_id": ObjectId,
  "clientId": String,
  "orderDate": Date,
  "totalAmount": Number,
  "items": [
    {
      "productId": String,
      "name": String,
      "quantity": Number,
      "unitPrice": Number,
      "subtotal": Number
    }
  ]
}
*/

export interface IBought extends IProduct {
  quantity: number,
  subtotal: number
}

export interface IClient {
  // _id,
  date: string,
  bought: IBought[]
}

@Component({
  selector: 'app-cash-register',
  standalone: true,
  imports: [
  ],
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.scss'
})
export class CashRegisterComponent {
  client = {
    date: '01-02-1969',
    bought: [
      {
        name: "cassa",
        quantity: 1,
        subtotal: 20
      },
      {
        name: "aglio",
        quantity: 4,
        subtotal: 16
      },
      {
        name: "carota",
        quantity: 1,
        subtotal: 12
      },
      {
        name: "pomodoro",
        quantity: 2,
        subtotal: 2
      },
    ],
  }
  productList: IProduct[] = [];
  total: number = 0;

  displayMode = signal<'list'|'grid'>('list');

  constructor( private _productService: ProductsService ) {
    this._productService.getAll().subscribe(res => {
      this.productList = res;
    });
  }
}
