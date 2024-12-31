import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    KeyValuePipe, /* Iter thorugh object in @for */
    DecimalPipe,
    DynamicTableComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor() {}

  /* TO DECIDE HOW DO THIS: strictly related to how data is saved in Cash Register
  */
  history_2 = [
    {
      _id: 'f924hgt9358th4f4893h3',
      createdAt: '01-02-1990',
      products: [
        { name: 'aglio', price: 10, quantity: 3 },
        { name: 'bieta', price: 4, quantity: 1 },
        { name: 'carota', price: 20, quantity: 5 }],
      total: 24
    },
    {
      _id: 'f924hgt9358th4f4893h3',
      createdAt: '01-02-1990',
      products: [
        { name: 'aglio', price: 10, quantity: 3 },
        { name: 'bieta', price: 4, quantity: 1 },
        { name: 'carota', price: 20, quantity: 5 }],
      total: 24
    },
    {
      _id: 'f924hgt9358th4f4893h3',
      createdAt: '01-02-1990',
      products: [
        { name: 'aglio', price: 10, quantity: 3 },
        { name: 'bieta', price: 4, quantity: 1 },
        { name: 'carota', price: 20, quantity: 5 }],
      total: 24
    }
  ]

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
    '14-12-306944444': [
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
    '12313124-12-3069': [
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
    '14-12-1111111111111111': [
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
