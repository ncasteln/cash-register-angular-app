import { Component, input, Input, NgModule, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { DecimalPipe } from '@angular/common';
import { IProduct } from '../../models';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-table',
  standalone: true,
  imports: [
    DynamicTableComponent,
    DecimalPipe,
    ProductActionsComponent,
    RouterLink,
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {
  @Input() products: IProduct[] = [];

  constructor( ) {}
  ngOnInit(): void {

  }

}
