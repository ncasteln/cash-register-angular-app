import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HistoryToolbarComponent } from './history-toolbar/history-toolbar.component';
import { HistoryItemComponent } from './history-item/history-item.component';
import { IOrder } from '../models';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../service/orders.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    KeyValuePipe, /* Iter thorugh object in @for */
    DecimalPipe,
    HistoryToolbarComponent,
    HistoryItemComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  history: IOrder[] = [
    {
      _id: "IU39329FI043FI4034IJ",
      createdAt: new Date(),
      updatedAt: new Date(),
      units: [
        {
            _id: "string",
            name: "Cavolo a mrenda",
            price: 12,
            priceType: 0,
            external: true,
            tax: 4,
            weight: 12.5,
            weightType: 1,
            discount: 20,
            subtotal: 45,
            quantity: 0
        }
      ]
    }
  ];

  constructor( private ordersService: OrdersService ) {}

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    // this.ordersService.getOrders().subscribe(o => this.history = o);
  }

  onReset() {
    // console.log("* RESET() ")
    // this.ordersService.reset().subscribe(o => this.getOrders());
  }
}
