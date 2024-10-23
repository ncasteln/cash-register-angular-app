import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    KeyValuePipe /* Iter thorugh object in @for */
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor() {}

  history = {
    '01-02-1969': [
      {
        // _id
        cassa: true,
        products: [
          { name: 'aglio', price: 10, quantity: 3 },
          { name: 'bieta', price: 4, quantity: 1 },
          { name: 'carota', price: 20, quantity: 5 },
        ],
        total: 23
      },
      {
        // _id
        cassa: true,
        products: [],
        total: 45
      },
      {
        // _id
        cassa: false,
        products: [
          { name: 'ciliege', price: 20, quantity: 9 },
        ],
        total: 12
      },
    ],
    '14-12-3069': [
      {
        // _id
        cassa: true,
        products: [
          { name: 'aglio', price: 10, quantity: 3 },
          { name: 'bieta', price: 4, quantity: 1 },
          { name: 'carota', price: 20, quantity: 5 },
        ],
        total: 23
      },
      {
        // _id
        cassa: true,
        products: [],
        total: 45
      },
      {
        // _id
        cassa: false,
        products: [
          { name: 'ciliege', price: 20, quantity: 9 },
        ],
        total: 12
      },
    ]
  }

}
